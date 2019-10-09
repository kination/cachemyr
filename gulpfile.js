const gulp = require('gulp')
const uglify = require('gulp-uglify')
const pipeline = require('readable-stream').pipeline

gulp.task('minify', () => {
  return pipeline(
    gulp.src('dist/*.js'),
    uglify(),
    gulp.dest('dist')
  )
})
