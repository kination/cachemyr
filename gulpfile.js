const gulp = require('gulp')
const terser = require('gulp-terser')

gulp.task('minify', () => {
  return gulp.src('dist/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist')
  )
})
