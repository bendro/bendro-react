'use strict'
var React = require('react')
var moment = require('moment')
var CommentHeader = React.createFactory(require('./comment-header'))
var CommentForm = React.createFactory(require('./comment-form'))

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'Comment',

	onSendComment: function(comment) {
		comment.responseTo = this.props.comment.id
		this.props.onSendComment(comment)
	},

  render: function() {
		var CommentList = React.createFactory(require('./comment-list'))

		var c = this.props.comment

		var time = moment(c.time)

    return rd.article(
			{
				className: 'comment',
			},
			CommentHeader({comment: c}),
			rd.p({}, c.text),
			(
				c.children ?
				CommentList({
					comments: c.children,
					onSendComment: this.props.onSendComment,
				}) :
				null
			)/*,
			CommentForm({
				onSendComment: this.onSendComment,
			})*/
    )
  },
})
