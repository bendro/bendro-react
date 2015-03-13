'use strict'
var React = require('react')

;[
	require('./comment.js'),
	require('./comment-form.js'),
	require('./comment-header.js'),
	require('./comment-list.js'),
	require('./comments.js'),
].forEach(function(c) {
	exports[c.displayName] = React.createFactory(c)
})
