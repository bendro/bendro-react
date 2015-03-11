'use strict'
var React = require('react')
var moment = require('moment')

var CommentHeader = React.createFactory(require('./comment-header'))

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentList',

	renderDate: function(time) {
		time = moment(time)
		return rd.time(
			{
				title: time.format('llll'),
				dateTime: time.format(),
				pubdate: true,
			},
			time.fromNow()
		)
	},

  render: function() {
		var c = this.props.comment

    return	rd.header(
			{},
			rd.a(
				{
					href: c.website || null,
					rel: 'author',
				},
				c.author || 'Unbekannt'
			),
			' sagte ',
			this.renderDate(c.time)
		)
  },
})
