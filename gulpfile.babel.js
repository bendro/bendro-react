import gulp from 'gulp';
import lazyReq from 'lazyreq';

const $ = lazyReq({
	less: 'gulp-less',
	autoprefixer: 'gulp-autoprefixer',
	browserify: 'browserify',
	vinylSourceStream: 'vinyl-source-stream',
	eslint: 'gulp-eslint',
	cached: 'gulp-cached',
});

function script(libs) {
	let options;
	if (!libs) {
		options = {
			entries: ['./script/main.js'],
			standalone: 'comments',
			bundleExternal: false,
		};
	} else {
		options = {};
	}
	const b = $.browserify(options);

	require('./package.json').bundleLibs.forEach(id => {
		if (libs) b.require(id, {expose: id});
		else b.external(id);
	});

	return b.bundle()
		.pipe($.vinylSourceStream(libs ? 'libs.js' : 'main.js'))
		.pipe(gulp.dest('./build/'));
}

gulp.task('script-lint', () =>
	gulp.src(['./script/**/*.js', './gulpfile.js'])
		.pipe($.cached('script-lint'))
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError())
);

gulp.task('script-build', () =>	script(false));

gulp.task('script', ['script-lint', 'script-build']);

gulp.task('libs', () => script(true));

gulp.task('style', () =>
	gulp.src('./style/main.less')
		.pipe($.less())
		.pipe($.autoprefixer())
		.pipe(gulp.dest('./build/'))
);

gulp.task('default', ['style', 'script', 'libs']);

gulp.task('watch', () => {
	gulp.watch('./script/**/*.js', ['script']);
	gulp.watch('./style/**/*.less', ['style']);
});
