'use strict'
var React = require('react')
var comps = require('./components.js')

require('./locales/de')

module.exports = function renderComments(props, elem) {
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

	return React.render(comps.Comments(props), elem)
}
