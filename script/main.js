'use strict'
var React = require('react')
var comps = require('./components.js')
var Api = require('./api.js')

require('./locales/de')

module.exports = function renderComments(site, options, elem) {
	var conn = new Api(options.url, site)

	var comp

	var props = {
		comments: [],
	}

	props.locales = 'de'
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
	}
	props.messages = {
		anonymous: 'Anonymus',
		commentHeader: '{author} schrieb {ctime}',
		commentHeaderEdited: '{author} schrieb {ctime} (bearbeitet {mtime})',
	}

	props.onSendComment = function(comment) {
		conn.postComment(comment, function(err, commentRes) {
			var comments
			if(err) {
				if(comment.responseTo) {
					comments = Api.editCommentById(
						comp.props.comments,
						comment.responseTo,
						function(c) {
							return c.set('formError', 'Fehler beim Senden des Kommentars')
						}
					)
				} else {
					comp.setProps({formError: 'Fehler beim Senden des Kommentars'})
				}

				console.error('error on posting a comment (', comment, '):', err)
			} else {
				comments = Api.addCommentToTree(comp.props.comments, commentRes)
			}

			comp.setProps({comments: comments})
		})
	}

	comp = React.render(comps.comments(props), elem)

	conn.getComments(function(err, res) {
		if(err) {
			comp.setProps({error: 'Fehler beim Laden der Kommentare'})
			console.error('error on loading comments:', err)
			return
		}

		comp.setProps({comments: res.comments})
	})

	return comp
}
