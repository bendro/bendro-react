'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var comps = require('./components.js')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'Comment',

	mixins: [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	],

	onSendComment: function(comment) {
		comment.responseTo = this.props.comment.get('id')
		this.props.onSendComment(comment)
	},

	render: function() {
		var c = this.props.comment

		return rd.article(
			{
				className: 'bendro-comment',
				itemScope: true,
				itemProp: c.has('responseTo') ? 'comment' : null,
				itemType: 'http://schema.org/Comment',
			},
			comps.commentHeader({comment: c}),
			rd.div(
				{
					className: 'bendro-comment__text',
					itemProp: 'text',
				},
				c.get('text')
			),
			comps.commentForm({
				onSendComment: this.onSendComment,
				defaultClosed: true,
			}),
			(
				c.has('children') ?
				comps.commentList({
					comments: c.get('children'),
					onSendComment: this.props.onSendComment,
				}) :
				null
			)
		)
	},
})
