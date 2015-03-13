'use strict'
var React = require('react')
var comps = require('./components.js')

module.exports = function renderComments(props, elem) {
	return React.render(comps.Comments(props), elem)
}
