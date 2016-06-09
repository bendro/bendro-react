'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var ImmutableRenderMixin = require('react-immutable-render-mixin')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentForm',

	mixins: [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	],

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
		var content

		if(this.state.activated) {
			content = rd.div(
				{},
				(
					this.props.defaultClosed
					? rd.a(
							{
								onClick: this.onDeactivateClick,
								href: '#',
								className: 'bendro-comment-form__deactivate',
							},
							'schließen'
						)
					: null
				),
				rd.textarea({
					onChange: this.onTextChange,
					value: this.state.text,
					placeholder: 'Kommentartext hier eintippen',
					className: 'bendro-comment-form__text',
				}),
				rd.input({
					onChange: this.onAuthorChange,
					value: this.state.author,
					placeholder: 'Name (optional)',
					type: 'text',
					className: 'bendro-comment-form__author',
				}),
				rd.input({
					onChange: this.onEmailChange,
					value: this.state.email,
					placeholder: 'Email (optional)',
					type: 'email',
					className: 'bendro-comment-form__email',
				}),
				rd.input({
					onChange: this.onWebsiteChange,
					value: this.state.website,
					placeholder: 'Webseite (optional)',
					type: 'url',
					className: 'bendro-comment-form__website',
				}),
				rd.button(
					{
						onClick: this.onSendClick,
						className: 'bendro-comment-form__send',
					},
					'senden'
				)
			)
		} else {
			content = rd.a(
				{
					onClick: this.onActivateClick,
					href: '#',
					className: 'bendro-comment-form__activate',
				},
				'antworten'
			)
		}

		var error = null
		if(this.props.error) {
			error = rd.div(
				{
					className: 'bendro-comment-form__error',
				},
				this.props.error
			)
		}

		return rd.div(
			{
				className: 'bendro-comment-form',
			},
			error,
			content
		)
	},
})
