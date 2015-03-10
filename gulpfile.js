'use strict'
var gulp = require('gulp')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var browserify = require('browserify')
var vinylSourceStream = require('vinyl-source-stream')

var extraLibs = [
	'moment/locale/de',
]

function script(libs) {
	var options
	if(!libs)
		options = {
			entries: ['./script/main.js'],
			standalone: 'comments',
			bundleExternal: false,
		}
	else
		options = {}

	var b = browserify(options)

	getDeps().forEach(function(id) {
		if(libs)
			b.require(id, {expose: id})
		else
			b.external(id)
	})

	return b.bundle()
		.pipe(vinylSourceStream(libs ? 'libs.js' : 'main.js'))
		.pipe(gulp.dest('./build/'))
}

gulp.task('script', function() {
	return script(false)
})


gulp.task('libs', function() {
	return script(true)
})

gulp.task('style', function() {
	return gulp.src('./style/main.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./build/'))
})

function getDeps() {
	var ret = []
	for(var k in require('./package.json').dependencies)
		ret.push(k)
	return ret.concat(extraLibs)
}

gulp.task('default', ['style', 'script', 'libs'])

gulp.task('watch', function() {
  gulp.watch('./script/**/*.js', ['script'])
  gulp.watch('./style/**/*.less', ['style'])
})
