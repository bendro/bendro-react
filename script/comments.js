'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var comps = require('./components.js')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'Comments',

	mixins: [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	],

	render: function() {
		var error = null
		if(this.props.error) {
			error = rd.div(
				{
					className: 'bendro-comments__error',
				},
				this.props.error
			)
		}

		return rd.div(
			{
				className: 'bendro-comments',
			},
			error,
			comps.commentForm({
				onSendComment: this.props.onSendComment,
				error: this.props.formError,
			}),
			comps.commentList({
				comments: this.props.comments,
				onSendComment: this.props.onSendComment,
			})
		)
	},
})
