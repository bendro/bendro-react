'use strict'
var React = require('react')
var moment = require('moment')

module.exports = React.createClass({
	displayName: 'CommentList',

  render: function() {
		var rd = React.DOM
		var c = this.props.comment

		var time = moment(c.time)

    return rd.div(
			{
				className: 'comment',
			},
			rd.time(
				{
					title: time.format('llll'),
					dateTime: time.format(),
				},
				time.fromNow()
			),
			rd.p({}, c.text)
    )
  },
})
