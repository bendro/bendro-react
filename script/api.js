import request from 'superagent';
import immutable from 'immutable';

/* eslint-disable no-param-reassign */

export default class Api {
	constructor(apiUrl, site, options) {
		if ('production' !== process.env.NODE_ENV) {
			if ('string' !== typeof apiUrl) {
				throw new Error('"apiUrl" is not a string');
			}

			if (-1 === apiUrl.indexOf('/', apiUrl.length - 1)) {
				throw new Error('"apiUrl" ends not with a "/"');
			}

			if ('string' !== typeof site) {
				throw new Error('"site" is not a string');
			}

			if (options && 'object' !== typeof options) {
				throw new Error('optional argument "options" is not a object');
			}
		}

		this.apiUrl = apiUrl;
		this.site = site;
		this.options = options || {};
	}

	getComments(cb) {
		request
			.get(`${this.apiUrl}comments`)
			.query({site: this.site})
			.end((err, res) => {
				if (err) {
					return cb(err);
				}

				let cs = [];
				let cur = null;

				res.body.forEach(c => {
					if (0 === c.left) {
						cs.push(c);
						cur = c;
						return;
					}

					while (cur.right < c.right) {
						cur = cur.parent;
					}

					c.parent = cur;
					cur.responses = cur.responses || [];
					cur.responses.push(c);
					cur = c;
				});

				cs = cs.map(function removeParent(v) {
					delete v.parent;
					if (v.responses) {
						v.responses = v.responses.map(removeParent);
					}
					return v;
				});

				cs = immutable.fromJS(cs);

				cb(null, {comments: cs});

				return undefined;
			});
	}

	postComment(comment, cb) {
		comment.site = this.site;

		request
			.post(`${this.apiUrl}comment`)
			.send(comment)
			.end((err, res) => {
				if (err) {
					return cb(err);
				}

				return cb(null, new immutable.Map(res.body));
			});
	}

	addCommentToTree(comments, comment) {
		if (comment.get('responseTo') === null) {
			return comments.unshift(comment);
		}

		return this.editCommentById(comments, comment.get('responseTo'), c =>
			c.set(
				'responses',
				c.has('responses')
					? c.get('responses').push(comment)
					: new immutable.List([comment])
			)
		);
	}

	editCommentById(comments, id, cb) {
		return comments.map(c => {
			if (id === c.get('id')) {
				return cb(c);
			}

			if (c.has('responses')) {
				return c.set(
					'responses',
					this.editCommentById(c.get('responses'), id, cb)
				);
			}

			return c;
		});
	}
}
