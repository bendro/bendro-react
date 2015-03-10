'use strict'
var React = require('react')
var Comments = React.createFactory(require('./comments'))

module.exports = function renderComments(props, elem) {
	return React.render(Comments(props), elem)
}
