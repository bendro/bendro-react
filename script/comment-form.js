'use strict'
var React = require('react')

module.exports = React.createClass({
	displayName: 'CommentForm',

	getInitialState: function() {
		return {
			text: '',
		}
	},

	onTextChange: function(e) {
		this.setState({text: e.target.value})
	},

	onSendClick: function(e) {
		var comment = {text: this.state.text}
		this.props.onSendComment(comment)
		this.setState({text: ''})
	},

  render: function() {
		var rd = React.DOM
    return rd.div(
			{},
			rd.textarea({onChange: this.onTextChange, value: this.state.text}),
			rd.button({onClick: this.onSendClick}, 'senden')
    )
  },
})
