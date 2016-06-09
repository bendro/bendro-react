import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './comments.js';
import {default as Api, addCommentToTree, editCommentById} from './api.js';
import localeDe from 'react-intl/locale-data/de';
import {addLocaleData, IntlProvider} from 'react-intl';
import immutable from 'immutable';

addLocaleData(localeDe);

export default function renderComments(site, options, elem) {
	const conn = new Api(options.url, site);

	const props = {
		comments: new immutable.List(),
	};

	const messages = {
		anonymous: 'Anonymus',
		commentHeader: '{author} schrieb {ctime}',
		commentHeaderEdited: '{author} schrieb {ctime} (bearbeitet {mtime})',
	};

	function render() {
		ReactDOM.render(
			(
				<IntlProvider locale="de" messages={messages}>
					<Comments {...props} />
				</IntlProvider>
			),
			elem
		);
	}

	props.onSendComment = comment => {
		conn.postComment(comment, (err, commentRes) => {
			let comments;
			if (err) {
				if (comment.responseTo) {
					comments = editCommentById(
						props.comments,
						comment.responseTo,
						c => c.set('formError', 'Fehler beim Senden des Kommentars')
					);
				} else {
					props.formError = 'Fehler beim Senden des Kommentars';
				}

				console.error('error on posting a comment (', comment, '):', err);
			} else {
				comments = addCommentToTree(props.comments, commentRes);
			}

			props.comments = comments;

			render();
		});
	};

	render();

	conn.getComments((err, res) => {
		if (err) {
			props.error = 'Fehler beim Laden der Kommentare';
			console.error('error on loading comments:', err);
		} else {
			props.comments = res.comments;
		}
		render();
	});
}
