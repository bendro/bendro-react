'use strict'
var React = require('react')
var request = require('superagent')
var CommentList = React.createFactory(require('./comment-list'))
var CommentForm = React.createFactory(require('./comment-form'))

module.exports = React.createClass({
	displayName: 'Comments',

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
				//TODO error ?
				var cs = []
				var cur = null

				res.body.forEach(function(c) {
					if(c.left === 0) {
						cs.push(c)
						cur = c
						return
					}

					while(cur.right < c.right)
						cur = cur.parent

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
				this.setState({
					comments: [res.body].concat(this.state.comments),
				})
			}.bind(this))
	},

	render: function() {
		var rd = React.DOM
		return rd.div(
			{},
			CommentForm({
				onSendComment: this.onSendComment,
			}),
			CommentList({
				comments: this.state.comments,
				onSendComment: this.onSendComment,
			})
		)
	},
})
