var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
	sf: {
		src: ['./js/sf.js', './js/sf-*.js'],
		dst: './js/min/'
	}
};

gulp.task('concat-sf', function() {
	return gulp.src(paths.sf.src)
	.pipe(concat('sf.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.sf.dst));
});

gulp.task('watch', function(){
	var watcher_sf = gulp.watch(paths.sf.src,['concat-sf']);

	watcher_sf.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

gulp.task('default', ['concat-sf']);
