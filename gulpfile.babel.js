import gulp from 'gulp';
import lazyReq from 'lazyreq';

const $ = lazyReq(require, {
	less: 'gulp-less',
	autoprefixer: 'gulp-autoprefixer',
	browserify: 'browserify',
	babelify: 'babelify',
	vinylSourceStream: 'vinyl-source-stream',
	eslint: 'gulp-eslint',
	cached: 'gulp-cached',
	bundleLibs: ['./package.json', 'bundleLibs'],
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

	$.bundleLibs.forEach(libs ? id => b.require(id, {expose: id}) : id => b.external(id));

	if (!libs) {
		b.transform($.babelify, {
			babelrc: false,
			presets: [
				'es2015',
				'react',
			],
			plugins: [
				'transform-async-to-generator',
				'transform-function-bind',
				'transform-runtime',
				'transform-decorators-legacy',
				'transform-class-properties',
			],
		});
	}

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
