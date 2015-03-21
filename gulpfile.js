'use strict'
var gulp = require('gulp')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var browserify = require('browserify')
var vinylSourceStream = require('vinyl-source-stream')
var eslint = require('gulp-eslint')
var cached = require('gulp-cached')

function script(libs) {
	var options
	if(!libs) {
		options = {
			entries: ['./script/main.js'],
			standalone: 'comments',
			bundleExternal: false,
		}
	} else {
		options = {}
	}
	var b = browserify(options)

	require('./package.json').bundleLibs.forEach(function(id) {
		if(libs) {
			b.require(id, {expose: id})
		} else {
			b.external(id)
		}
	})

	return b.bundle()
		.pipe(vinylSourceStream(libs ? 'libs.js' : 'main.js'))
		.pipe(gulp.dest('./build/'))
}

gulp.task('script-lint', function() {
	return gulp.src(['./script/**/*.js', './gulpfile.js'])
		.pipe(cached('script-lint'))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

gulp.task('script-build', function() {
	return script(false)
})

gulp.task('script', ['script-lint', 'script-build'])

gulp.task('libs', function() {
	return script(true)
})

gulp.task('style', function() {
	return gulp.src('./style/main.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./build/'))
})

gulp.task('default', ['style', 'script', 'libs'])

gulp.task('watch', function() {
	gulp.watch('./script/**/*.js', ['script'])
	gulp.watch('./style/**/*.less', ['style'])
})
