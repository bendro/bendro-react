'use strict'
var React = require('react')
var moment = require('moment')

var CommentHeader = React.createFactory(require('./comment-header'))

module.exports = React.createClass({
	displayName: 'CommentList',

  render: function() {
		var rd = React.DOM
		var c = this.props.comment

		var time = moment(c.time)

    return rd.article(
			{
				className: 'comment',
			},
			CommentHeader({comment: c}),
			rd.p({}, c.text)
    )
  },
})
