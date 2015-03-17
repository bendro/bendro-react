'use strict'
var React = require('react')
var ReactIntl = require('react-intl')

var formattedRelative = React.createFactory(ReactIntl.FormattedRelative)
var formattedMessage = React.createFactory(ReactIntl.FormattedMessage)
var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentHeader',

	mixins: [ReactIntl.IntlMixin],

	renderAuthor: function(c) {
		var a = rd.span(
			{
				itemProp: 'name',
			},
			c.author || this.getIntlMessage('anonymous')
		)

		if(c.website) {
			a = rd.a(
				{
					href: c.website,
					rel: 'author,external',
					itemProp: 'url',
				},
				a
			)
		}

		return rd.span(
			{
				className: 'author',
				itemScope: true,
				itemType: 'http://schema.org/Person',
				itemProp: 'author',
			},
			a
		)
	},

	renderDate: function(time, type) {
		return rd.time(
			{
				title: this.formatDate(time, 'datetime'),
				dateTime: time,
				itemProp: type,
			},
			formattedRelative({value: time, style: 'numeric'})
		)
	},

	render: function() {
		var c = this.props.comment

		return rd.header(
			{},
			formattedMessage({
				message: c.ctime === c.mtime
					? this.getIntlMessage('commentHeader')
					: this.getIntlMessage('commentHeaderEdited'),
				author: this.renderAuthor(c),
				ctime: this.renderDate(c.ctime, 'dateCreated'),
				mtime: this.renderDate(c.mtime, 'dateModified'),
			})
		)
	},
})
