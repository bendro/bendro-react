import ReactDOM from 'react-dom';
import * as comps from './components.js';
import Api from './api.js';
import './locales/de';

export default function renderComments(site, options, elem) {
	const conn = new Api(options.url, site);

	const props = {
		comments: [],
	};

	props.locales = 'de';
	props.formats = {
		date: {
			datetime: {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			},
		},
	};
	props.messages = {
		anonymous: 'Anonymus',
		commentHeader: '{author} schrieb {ctime}',
		commentHeaderEdited: '{author} schrieb {ctime} (bearbeitet {mtime})',
	};

	let comp;

	props.onSendComment = comment => {
		conn.postComment(comment, (err, commentRes) => {
			let comments;
			if (err) {
				if (comment.responseTo) {
					comments = Api.editCommentById(
						comp.props.comments,
						comment.responseTo,
						c => c.set('formError', 'Fehler beim Senden des Kommentars')
					);
				} else {
					comp.setProps({formError: 'Fehler beim Senden des Kommentars'});
				}

				console.error('error on posting a comment (', comment, '):', err);
			} else {
				comments = Api.addCommentToTree(comp.props.comments, commentRes);
			}

			comp.setProps({comments});
		});
	};

	// eslint-disable-next-line prefer-const
	comp = ReactDOM.render(comps.comments(props), elem);

	conn.getComments((err, res) => {
		if (err) {
			comp.setProps({error: 'Fehler beim Laden der Kommentare'});
			console.error('error on loading comments:', err);
			return;
		}

		comp.setProps({comments: res.comments});
	});

	return comp;
}
