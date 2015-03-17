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
			if(err) {
				throw err
			}

			// TODO: add to proper position
			comp.setProps({
				comments: comp.props.comments.concat([commentRes]),
			})
		})
	}

	comp = React.render(comps.comments(props), elem)

	conn.getComments(function(err, res) {
		if(err) {
			throw err
		}

		comp.setProps({comments: res.comments})
	})

	return comp
}
