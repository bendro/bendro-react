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
			author: '',
			email: '',
			website: '',
			activated: !this.props.defaultClosed,
		}
	},

	onTextChange: function(e) {
		this.setState({text: e.target.value})
	},

	onAuthorChange: function(e) {
		this.setState({author: e.target.value})
	},

	onEmailChange: function(e) {
		this.setState({email: e.target.value})
	},

	onWebsiteChange: function(e) {
		this.setState({website: e.target.value})
	},

	onSendClick: function() {
		var comment = {
			text: this.state.text,
			author: this.state.author,
			email: this.state.email,
			website: this.state.website,
		}
		this.props.onSendComment(comment)

		this.setState({
			text: '',
			author: '',
			email: '',
			website: '',
			activated: !this.props.defaultClosed,
		})
	},

	onActivateClick: function(e) {
		e.preventDefault()
		this.setState({activated: true})
	},

	onDeactivateClick: function(e) {
		e.preventDefault()
		this.setState({activated: false})
	},

	render: function() {
		if(this.state.activated) {
			return rd.div(
				{},
				(
					this.props.defaultClosed
					? rd.a(
							{
								onClick: this.onDeactivateClick,
								href: '',
							},
							'schließen'
						)
					: null
				),
				rd.textarea({
					onChange: this.onTextChange,
					value: this.state.text,
					placeholder: 'Kommentartext hier eintippen',
				}),
				rd.input({
					onChange: this.onAuthorChange,
					value: this.state.author,
					placeholder: 'Name (optional)',
				}),
				rd.input({
					onChange: this.onEmailChange,
					value: this.state.email,
					placeholder: 'Email (optional)',
				}),
				rd.input({
					onChange: this.onWebsiteChange,
					value: this.state.website,
					placeholder: 'Webseite (optional)',
				}),
				rd.button({onClick: this.onSendClick}, 'senden')
			)
		} else {
			return rd.div(
				{},
				rd.a(
					{
						onClick: this.onActivateClick,
						href: '#',
					},
					'antworten'
				)
			)
		}
	},
})
