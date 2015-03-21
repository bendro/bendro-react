'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var comps = require('./components.js')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentList',

	mixins: [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	],

	render: function() {
		var comments = this.props.comments.map(function(c) {
			return comps.comment({
				key: c.get('id'),
				comment: c,
				onSendComment: this.props.onSendComment,
			})
		}.bind(this))

		return rd.div(
			{
				className: 'bendro-comment-list',
			},
			comments
		)
	},
})
