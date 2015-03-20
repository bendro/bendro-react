'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var comps = require('./components.js')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'Comment',

	mixins: [ReactIntl.IntlMixin],

	onSendComment: function(comment) {
		comment.responseTo = this.props.comment.id
		this.props.onSendComment(comment)
	},

	render: function() {
		var c = this.props.comment

		return rd.article(
			{
				className: 'comment',
				itemScope: true,
				itemProp: c.responseTo ? 'comment' : null,
				itemType: 'http://schema.org/Comment',
			},
			comps.commentHeader({comment: c}),
			rd.div(
				{
					className: 'text',
					itemProp: 'text',
				},
				c.text
			),
			comps.commentForm({
				onSendComment: this.onSendComment,
				defaultClosed: true,
			}),
			(
				c.children ?
				comps.commentList({
					comments: c.children,
					onSendComment: this.props.onSendComment,
				}) :
				null
			)
		)
	},
})
