'use strict'
var React = require('react')

var Comment = React.createFactory(require('./comment'))
var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentList',

  render: function() {
		var comments = this.props.comments.map(function(c) {
			return Comment({
				key: c.id,
				comment: c,
				onSendComment: this.props.onSendComment,
			})
		}.bind(this))

    return rd.div(
			{},
			comments
    )
  },
})
