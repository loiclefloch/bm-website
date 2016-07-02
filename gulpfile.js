const gulp = require('gulp'),
  gulpFilter = require('gulp-filter'),
  babelify = require('babelify'),
  flatten = require('gulp-flatten'),
  sourcemaps = require('gulp-sourcemaps'),
  mainBowerFiles = require('main-bower-files'),
  rename = require('gulp-rename'),
  minifycss = require('gulp-minify-css'),
  changed = require('gulp-changed'),
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  reactify = require('reactify'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  historyApiFallback = require('connect-history-api-fallback');

const p = {
  jsx: './scripts/app.js',
  scss: 'styles/main.scss',
  scssSource: 'styles/**/*.scss',
  font: 'fonts/*',
  bundle: 'app.js',
  distJs: 'public/dist/js',
  distCss: 'public/dist/css',
  distFont: 'public/dist/fonts',
  watchifyArgs: {
    cache: {},
    packageCache: {},
    poll: 100 // On http://stackoverflow.com/questions/26708205/webpack-watch-isnt-compiling-changed-files/28610124#28610124
  }
};

gulp.task('clean', function(cb) {
  return del(['public/dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({
    notify: false,
    files: ['./css/*.css', './js/*.js', './index.html'],
    server: {
      baseDir: './',
      // see https://github.com/BrowserSync/browser-sync/issues/204 and
      // http://stackoverflow.com/questions/25770843/reactjs-routing-browser-sync-reload-on-path-produces-cannot-get-path-error
      middleware: [historyApiFallback()]
    }
  });
});

gulp.task('watchify', function() {
  const bundler = watchify(browserify(p.jsx, p.watchifyArgs).transform(babelify));

  function rebundle() {
    const updateStart = Date.now();
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(buffer())
      // .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
      // .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({ stream: true }));
  }

  bundler.transform(reactify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function() {

  const bundler = browserify(p.jsx, p.watchifyArgs).transform(babelify);

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(p.distJs));
  }

//  bundler.transform(reactify)
//    .on('update', rebundle);
  return rebundle();
//
//  browserify(p.jsx)
//    .transform(reactify)
//    .bundle()
//    .pipe(source(p.bundle))
//    .pipe(buffer())
//    .pipe(uglify())
//    .pipe(gulp.dest(p.distJs));
});

gulp.task('fonts', function() {
  return gulp.src(p.font)
    .pipe(gulp.dest(p.distFont));
});

gulp.task('styles', function() {
  return gulp.src(p.scss)
    .pipe(changed(p.distCss))
    .pipe(sass({errLogToConsole: true}))
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 1 version']
    }))
    .pipe(csso())
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

// Ugly hack to bring modernizr in
gulp.task('modernizr', function() {
  return gulp.src('bower_components/modernizr/modernizr.js')
    .pipe(gulp.dest(p.distJs));
});

gulp.task('bower-libs', function() {
  const jsFilter = gulpFilter('*.js', {restore: true});
  const cssFilter = gulpFilter('*.css', {restore: true});
  const fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

  return gulp.src(mainBowerFiles())

    // JS from bower_components
    .pipe(jsFilter)
    .pipe(gulp.dest(p.distJs))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(p.distJs))
    .pipe(jsFilter.restore)

    // css from bower_components, minified
    .pipe(cssFilter)
    .pipe(gulp.dest(p.distCss))
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(p.distCss))
    .pipe(cssFilter.restore)

    // font files from bower_components
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest(p.distFont));
});

gulp.task('libs', function() {
  gulp.start(['modernizr', 'bower-libs', 'fonts']);
});

gulp.task('watchTask', function() {
  gulp.watch(p.scssSource, ['styles']);
});

gulp.task('watch', ['clean'], function() {
  gulp.start(['libs', 'browserSync', 'watchTask', 'watchify', 'styles']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start(['libs', 'browserify', 'styles']);
});

gulp.task('default', function() {
  console.log('Run `gulp watch` or `gulp build`');
});
