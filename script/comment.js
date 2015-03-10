'use strict'
var React = require('react')
var moment = require('moment')

module.exports = React.createClass({
	displayName: 'CommentList',

  render: function() {
		var rd = React.DOM
		var c = this.props.comment

		var time = moment(c.time)

    return rd.article(
			{
				className: 'comment',
			},
			rd.header(
				{},
				rd.a(
					{
						href: c.website || null,
						rel: 'author',
					},
					c.author || 'Unbekannt'
				),
				' sagte ',
				rd.time(
					{
						title: time.format('llll'),
						dateTime: time.format(),
						pubdate: true,
					},
					time.fromNow()
				)
			),
			rd.p({}, c.text)
    )
  },
})
