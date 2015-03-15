'use strict'
var React = require('react')
var ReactIntl = require('react-intl')
var request = require('superagent')
var comps = require('./components.js')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'Comments',

	mixins: [ReactIntl.IntlMixin],

	getInitialState: function() {
		return {
			comments: [],
		}
	},

	componentDidMount: function() {
		this.loadComments()
	},

	loadComments: function() {
		request
			.get(this.props.url + 'comments?site=' + this.props.site)
			.end(function(err, res) {
				if(err) {
					throw err
				}
				var cs = []
				var cur = null

				res.body.forEach(function(c) {
					if(c.left === 0) {
						cs.push(c)
						cur = c
						return
					}

					while(cur.right < c.right) {
						cur = cur.parent
					}

					c.parent = cur
					cur.children = cur.children || []
					cur.children.push(c)
					cur = c
				})

				this.setState({comments: cs})
			}.bind(this))
	},

	onSendComment: function(comment) {
		comment.site = this.props.site

		request
			.post(this.props.url + 'comment')
			.send(comment)
			.end(function(err, res) {
				if(err) {
					throw err
				}

				this.setState({
					comments: [res.body].concat(this.state.comments),
				})
			}.bind(this))
	},

	render: function() {
		return rd.div(
			{},
			comps.commentForm({
				onSendComment: this.onSendComment,
			}),
			comps.commentList({
				comments: this.state.comments,
				onSendComment: this.onSendComment,
			})
		)
	},
})
