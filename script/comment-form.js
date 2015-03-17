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
			activated: !this.props.defaultClosed,
		}
	},

	onTextChange: function(e) {
		this.setState({text: e.target.value})
	},

	onSendClick: function() {
		var comment = {text: this.state.text}
		this.props.onSendComment(comment)
		this.setState({
			text: '',
			activated: !this.props.defaultClosed,
		})
	},

	onActivateClick: function() {
		this.setState({activated: true})
	},

	onDeactivateClick: function() {
		this.setState({
			activated: false,
		})
	},

	render: function() {
		if(this.state.activated) {
			return rd.div(
				{},
				rd.textarea({onChange: this.onTextChange, value: this.state.text}),
				(
					this.props.defaultClosed
					? rd.button({onClick: this.onDeactivateClick}, 'schließen')
					: null
				),
				rd.button({onClick: this.onSendClick}, 'senden')
			)
		} else {
			return rd.div(
				{},
				rd.button({onClick: this.onActivateClick}, 'antworten')
			)
		}
	},
})
