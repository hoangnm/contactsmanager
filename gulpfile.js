var gulp = require('gulp');
var sass = require('gulp-sass');

var IS_WATCH = false;

gulp.task('sass', function(done) {
  gulp.src('./css/scss/app.scss')
        .pipe(sass({
          onError: function(err) {
            //If we're watching, don't exit on error
            if (IS_WATCH) {
              console.log(err);
            } else {
              done(err);
            }
          }
        }))
        .pipe(gulp.dest('./css'))
        .on('end', done);
});


gulp.task('watch', function() {
  IS_WATCH = true;
  gulp.watch('./css/scss/**/*.scss', ['sass']);
});