'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var ImmutableRenderMixin = require('react-immutable-render-mixin')

var formattedRelative = React.createFactory(ReactIntl.FormattedRelative)
var formattedMessage = React.createFactory(ReactIntl.FormattedMessage)
var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentHeader',

	mixins: [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	],

	renderAuthor: function(c) {
		var a = rd.span(
			{
				itemProp: 'name',
			},
			c.get('author') || this.getIntlMessage('anonymous')
		)

		var website = c.get('website')
		if(website) {
			a = rd.a(
				{
					href: website,
					rel: 'author,external',
					itemProp: 'url',
					className: 'bendro-comment-header__website',
					target: 'bendro-author',
				},
				a
			)
		}

		return rd.span(
			{
				itemScope: true,
				itemType: 'http://schema.org/Person',
				itemProp: 'author',
				className: 'bendro-comment-header__author',
			},
			a
		)
	},

	renderDate: function(time, type, typeCss) {
		return rd.time(
			{
				title: this.formatDate(time, 'datetime'),
				dateTime: time,
				itemProp: type,
				className: 'bendro-comment-header__' + typeCss,
			},
			formattedRelative({value: time, style: 'numeric'})
		)
	},

	render: function() {
		var c = this.props.comment
		var ctime = c.get('ctime')
		var mtime = c.get('mtime')

		return rd.header(
			{
				className: 'bendro-comment-header',
			},
			formattedMessage({
				message: ctime === mtime
					? this.getIntlMessage('commentHeader')
					: this.getIntlMessage('commentHeaderEdited'),
				author: this.renderAuthor(c),
				ctime: this.renderDate(ctime, 'dateCreated', 'ctime'),
				mtime: this.renderDate(mtime, 'dateModified', 'mtime'),
			})
		)
	},
})
