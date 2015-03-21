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
		return rd.div(
			{
				className: 'bendro-comments',
			},
			comps.commentForm({
				onSendComment: this.props.onSendComment,
			}),
			comps.commentList({
				comments: this.props.comments,
				onSendComment: this.props.onSendComment,
			})
		)
	},
})
