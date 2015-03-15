'use strict'
var React = require('react')

;[
	require('./comment.js'),
	require('./comment-form.js'),
	require('./comment-header.js'),
	require('./comment-list.js'),
	require('./comments.js'),
].forEach(function(c) {
	var name = c.displayName
	name = name.charAt(0).toLowerCase() + name.substr(1)
	exports[name] = React.createFactory(c)
})
