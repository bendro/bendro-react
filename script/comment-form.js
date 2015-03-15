'use strict'
var React = require('react')
var ReactIntl = require('react-intl')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentForm',

	mixins: [ReactIntl.IntlMixin],

	getInitialState: function() {
		return {
			text: '',
		}
	},

	onTextChange: function(e) {
		this.setState({text: e.target.value})
	},

	onSendClick: function() {
		var comment = {text: this.state.text}
		this.props.onSendComment(comment)
		this.setState({text: ''})
	},

	render: function() {
		return rd.div(
			{},
			rd.textarea({onChange: this.onTextChange, value: this.state.text}),
			rd.button({onClick: this.onSendClick}, 'senden')
		)
	},
})
