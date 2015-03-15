'use strict'
var React = require('react')
var moment = require('moment')
var ReactIntl = require('react-intl')
var comps = require('./components.js')

var FormattedRelative = React.createFactory(ReactIntl.FormattedRelative)
var FormattedMessage = React.createFactory(ReactIntl.FormattedMessage)
var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentHeader',

	mixins: [ReactIntl.IntlMixin],

	renderDate: function(time) {
		return rd.time(
			{
				title: this.formatDate(time, 'datetime'),
				dateTime: time,
			},
			FormattedRelative({value: time, style: 'numeric'})
		)
	},

  render: function() {
		var c = this.props.comment

    return	rd.header(
			{},
			FormattedMessage({
				message: c.ctime === c.mtime
					? this.getIntlMessage('commentHeader')
					: this.getIntlMessage('commentHeaderEdited'),
				author: rd.a(
					{
						href: c.website || null,
						rel: 'author,external',
					},
					c.author || this.getIntlMessage('anonymous')
				),
				ctime: this.renderDate(c.ctime),
				mtime: this.renderDate(c.mtime),
			})
		)
  },
})
