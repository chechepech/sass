const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Move JS Files to assets
/* function js(){
return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
'node_modules/jquery/dist/jquery.min.js',
'node_modules/popper.js/dist/umd/popper.min.js'])
.pipe(gulp.dest("src/js"))
.pipe(browserSync.stream());
}; */

function js(){
  return gulp.src('src/js')
  .pipe(browserSync.stream());
  };

//Move fontawesome fonts folder to assets
function fonts(){
return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
.pipe(gulp.dest("src/webfonts"))
};

//Move fontawesome css file
function fa(){
return gulp.src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
.pipe(gulp.dest("src/css"))
};

//compile SASS
function my_sass(){
return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
.pipe(sass())
.pipe(gulp.dest("src/css"))
.pipe(browserSync.stream());
};

//Watch SASS & SERVE
function serve(){
        browserSync.init({
          server: {
            baseDir: './src'
          }
        });
      
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'], gulp.series(my_sass));
    gulp.watch("src/*.html").on('change',browserSync.reload);
};

gulp.task('default',gulp.series(js,fonts,fa,serve));