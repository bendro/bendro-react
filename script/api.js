'use strict'
var request = require('superagent')
var immutable = require('immutable')

function Api(apiUrl, site, options) {
	if(!(this instanceof Api)) {
		return new Api(apiUrl, site, options)
	}

	if('production' !== process.env.NODE_ENV) {
		if('string' !== typeof apiUrl) {
			throw new Error('"apiUrl" is not a string')
		}

		if(-1 === apiUrl.indexOf('/', apiUrl.length - 1)) {
			throw new Error('"apiUrl" ends not with a "/"')
		}

		if('string' !== typeof site) {
			throw new Error('"site" is not a string')
		}

		if(options && 'object' !== typeof options) {
			throw new Error('optional argument "options" is not a object')
		}
	}

	this.apiUrl = apiUrl
	this.site = site
	this.options = options || {}
}

Api.prototype.getComments = function getComments(cb) {
	request
		.get(this.apiUrl + 'comments')
		.query({site: this.site})
		.end(function(err, res) {
			if(err) {
				cb(err)
			}

			var cs = []
			var cur = null

			res.body.forEach(function(c) {
				if(0 === c.left) {
					cs.push(c)
					cur = c
					return
				}

				while(cur.right < c.right) {
					cur = cur.parent
				}

				c.parent = cur
				cur.children = cur.children || []
				cur.children.push(c)
				cur = c
			})

			cs = cs.map(function removeParent(v) {
				delete v.parent
				if(v.children) {
					v.children = v.children.map(removeParent)
				}
				return v
			})

			cs = immutable.fromJS(cs)

			cb(null, {comments: cs})
		})
}

Api.prototype.postComment = function postComment(comment, cb) {
	comment.site = this.site

	request
		.post(this.apiUrl + 'comment')
		.send(comment)
		.end(function(err, res) {
			if(err) {
				cb(err)
			}

			cb(null, new immutable.Map(res.body))
		})
}

module.exports = Api
