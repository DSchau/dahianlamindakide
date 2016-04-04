// https://dahianlamindakide.ayriyazilir.com/

'use strict';

// node_modules
var _            = require('lodash');
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var csslint      = require('gulp-csslint');
var cssnano      = require('gulp-cssnano');
var jshint       = require('gulp-jshint');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sizereport   = require('gulp-sizereport');
var uglify       = require('gulp-uglify');
var wrap         = require('gulp-wrap');
var browser_sync = require('browser-sync');
var sequence     = require('run-sequence');
var sassdoc      = require('sassdoc');

// local modules
var pkg = require('./package.json');

// variables
var assets       = {
  css  : './assets/css/',
  fonts: './assets/fonts/',
  img  : './assets/img/',
  js   : './assets/js/',
  logo : './assets/logo/',
  sass : './assets/sass/'
};
var notification = {
  title  : pkg.title,
  message: pkg.homepage,
  icon   : __dirname + '/assets/logo/' + pkg.abbreviation + '.png',
  onLast : true,
  wait   : true
};
var browserSync  = browser_sync.create(pkg.title);
var reload       = browserSync.reload;

// tasks
gulp.task('default', function(done) {
  sequence(
    'js',
    'sass',
    'css',
    'vendor',
    done
  );
});

gulp.task('dev', function(done) {
  sequence(
    'js',
    'sass',
    'css',
    done
  );
});

gulp.task('publish', function(done) {
  sequence(
    'js',
    'sass',
    'css',
    'vendor',
    done
  );
});

// vendor
gulp.task('vendor:js', function() {
  return gulp
    .src([
      './bower_components/bootstrap/dist/js/bootstrap.min.js',

      './bower_components/fullpage.js/dist/jquery.fullpage.min.js',
      './bower_components/fullpage.js/dist/jquery.fullpage.min.js.map',
      './bower_components/fullpage.js/vendors/jquery.easings.min.js',
      './bower_components/fullpage.js/vendors/jquery.slimscroll.min.js',

      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/jquery/dist/jquery.min.map',

      './bower_components/particles.js/particles.min.js',

      './bower_components/sharer.js/sharer.min.js'
    ])
    .pipe(gulp.dest(assets.js))
    .pipe(sizereport({
      gzip: true
    }))
    .pipe(notify(_.extend(notification, {
      message: 'vendor:js'
    })));
});

gulp.task('vendor:css', function() {
  return gulp
    .src([
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './bower_components/bootstrap/dist/css/bootstrap.min.css.map',

      './bower_components/fullpage.js/dist/jquery.fullpage.min.css',
      './bower_components/fullpage.js/dist/jquery.fullpage.min.css.map',

      './bower_components/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(gulp.dest(assets.css))
    .pipe(sizereport({
      gzip: true
    }))
    .pipe(notify(_.extend(notification, {
      message: 'vendor:css'
    })));
});

gulp.task('vendor:font', function() {
  return gulp
    .src([
      './bower_components/font-awesome/fonts/FontAwesome.otf',
      './bower_components/font-awesome/fonts/fontawesome-webfont.eot',
      './bower_components/font-awesome/fonts/fontawesome-webfont.svg',
      './bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
      './bower_components/font-awesome/fonts/fontawesome-webfont.woff',
      './bower_components/font-awesome/fonts/fontawesome-webfont.woff2'
    ])
    .pipe(gulp.dest(assets.fonts))
    .pipe(sizereport({
      gzip: true
    }))
    .pipe(notify(_.extend(notification, {
      message: 'vendor:font'
    })));
});

gulp.task('vendor', function(done) {
  sequence(
    'vendor:js',
    'vendor:css',
    'vendor:font',
    done
  );
});

// javascript
gulp.task('jshint', function() {
  return gulp
    .src([
      assets.js + '**/*.js',
      '!' + assets.js + '**/*.min.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    //.pipe(jshint.reporter('fail'))
    .pipe(notify(_.extend(notification, {
      message: 'jshint'
    })));
});

gulp.task('uglify', function() {
  return gulp
    .src(assets.js + 'app.js')
    .pipe(uglify())
    .pipe(wrap('// https://dahianlamindakide.ayriyazilir.com/\n<%= contents %>\n'))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(assets.js))
    .pipe(sizereport({
      gzip: true
    }))
    .pipe(notify(_.extend(notification, {
      message: 'uglify'
    })));
});

gulp.task('js', function(done) {
  sequence(
    'jshint',
    'uglify',
    done
  );
});

gulp.task('js:watch', function() {
  gulp.watch(assets.js + '**/*.js', [
    'js'
  ]);
});

// sass
gulp.task('sass', function() {
  return gulp
    .src([
      assets.sass + '**/*.{scss,sass}'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(assets.css))
    .pipe(notify(_.extend(notification, {
      message: 'sass'
    })));
});

gulp.task('sass:watch', function() {
  gulp.watch(assets.sass + '**/*.{scss,sass}', [
    'sass'
  ]);
});

gulp.task('sassdoc', function() {
  return gulp
    .src([
      assets.sass + '**/*.{scss,sass}'
    ])
    .pipe(sassdoc())
    .pipe(notify(_.extend(notification, {
      message: 'sassdoc'
    })));
});

// css
gulp.task('csslint', function() {
  return gulp
    .src([
      assets.css + 'style.css',
      '!' + assets.css + 'style.min.css'
    ])
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter('compact'))
    //.pipe(csslint.reporter('fail'))
    .pipe(notify(_.extend(notification, {
      message: 'csslint'
    })));
});

gulp.task('cssnano', function() {
  return gulp
    .src(assets.css + 'style.css')
    .pipe(cssnano())
    .pipe(wrap('/* https://dahianlamindakide.ayriyazilir.com/ */\n<%= contents %>\n'))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(assets.css))
    .pipe(sizereport({
      gzip: true
    }))
    .pipe(notify(_.extend(notification, {
      message: 'cssnano'
    })));
});

gulp.task('css', function(done) {
  sequence(
    'csslint',
    'cssnano',
    done
  );
});

gulp.task('css:watch', function() {
  gulp.watch(assets.css + 'style.css', [
    'css'
  ]);
});

// watcher
gulp.task('watch', [
  'js:watch',
  'sass:watch',
  'css:watch',
  'serve'
], reload);

// serve
gulp.task('serve', function () {
  browserSync.init({
    open: false,
    port: 6869,
    server: {
      baseDir: './'
    },
    ui: {
      port: 8002
    }
  });
});
