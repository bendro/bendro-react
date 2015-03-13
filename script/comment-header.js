'use strict'
var React = require('react')
var moment = require('moment')
var comps = require('./components.js')

var rd = React.DOM

module.exports = React.createClass({
	displayName: 'CommentHeader',

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

		var edit = null
		if(c.ctime !== c.mtime)
			edit = rd.span(
				{},
				' (bearbeitet ',
				this.renderDate(c.mtime),
				')'
			)

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
			this.renderDate(c.ctime),
			edit
		)
  },
})
