'use strict'
var React = require('react')

var Comment = React.createFactory(require('./comment'))

module.exports = React.createClass({
	displayName: 'CommentList',

  render: function() {
		var rd = React.DOM

		var comments = this.props.comments.map(function(c) {
			return Comment({key: c.id, comment: c})
		})

    return rd.div(
			{},
			comments
    )
  },
})
