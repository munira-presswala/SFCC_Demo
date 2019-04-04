var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var webp = require('gulp-webp');
var cmq = require('crlab-gulp-combine-media-queries');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })

gulp.task('hello', async function() {
    console.log("Hello User");
  });

gulp.task('sass', function(){
return gulp.src('app/scss/**/*.scss')   
    .pipe(sourcemaps.init())
    .pipe(sass())  // Using gulp-sass
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('default',() =>
    gulp.src('app/images/**.*')
    .pipe(webp())
        .pipe(gulp.dest('app/assets/images'))
);

gulp.task('watch', gulp.series('sass','default','browserSync',function(){
    gulp.watch('app/scss/**/*.scc',
    gulp.series('sass'));
}));

gulp.task('cmq', function () {
    gulp.src('app/css/Style.css')
      .pipe(cmq({
        log: true
      }))
      .pipe(gulp.dest('app/assets/css'));
  });


