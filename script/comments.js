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

				this.setState({comments: res.body})
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
			CommentForm({onSendComment: this.onSendComment}),
			CommentList({comments: this.state.comments})
		)
	},
})
