var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var paths = {
	sf_js: {
		src: ['./js/sf.js', './js/sf-*.js'],
		dst: './js/min/'
	},
	sf_css: {
		src: './css/sf-*.css',
		dst: './css/'
	}
};

gulp.task('concat-sf-js', function() {
	return gulp.src(paths.sf_js.src)
	.pipe(concat('sf.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.sf_js.dst));
});

gulp.task('concat-sf-css', function() {
	return gulp.src(paths.sf_css.src)
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cssnano())
	.pipe(concat('sf.css'))
	.pipe(gulp.dest(paths.sf_css.dst));
});

gulp.task('watch', function() {
	var watcher_sf_js = gulp.watch(paths.sf_js.src, ['concat-sf-js']);
	var watcher_sf_css = gulp.watch(paths.sf_css.src, ['concat-sf-css']);

	watcher_sf_js.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

	watcher_sf_css.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

});

gulp.task('default', ['concat-sf-js', 'concat-sf-css']);
