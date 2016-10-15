// https://dahianlamindakide.ayriyazilir.com/

'use strict';

// node_modules
const _            = require('lodash');
const gulp         = require('gulp');
const concat       = require('gulp-concat');
const csslint      = require('gulp-csslint');
const cssnano      = require('gulp-cssnano');
const jshint       = require('gulp-jshint');
const notify       = require('gulp-notify');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const sizereport   = require('gulp-sizereport');
const uglify       = require('gulp-uglify');
const wrap         = require('gulp-wrap');
const browser_sync = require('browser-sync');
const sequence     = require('run-sequence');
const sassdoc      = require('sassdoc');

// local modules
let pkg = require('./package.json');

// variables
let assets       = {
  css  : './assets/css/',
  fonts: './assets/fonts/',
  img  : './assets/img/',
  js   : './assets/js/',
  logo : './assets/logo/',
  sass : './assets/sass/'
};
let notification = {
  title  : pkg.title,
  message: pkg.homepage,
  icon   : __dirname + '/assets/logo/' + pkg.abbreviation + '.png',
  onLast : true,
  wait   : true
};
let browserSync  = browser_sync.create(pkg.title);
let reload       = browserSync.reload;

// tasks
gulp.task('default', (done) => {
  sequence(
    'js',
    'sass',
    'css',
    'vendor',
    done
  );
});

gulp.task('dev', (done) => {
  sequence(
    'js',
    'sass',
    'css',
    done
  );
});

gulp.task('publish', (done) => {
  sequence(
    'js',
    'sass',
    'css',
    'vendor',
    done
  );
});

// vendor
gulp.task('vendor:js', () => {
  return gulp
    .src([
      './bower_components/bootstrap/dist/js/bootstrap.min.js',

      './bower_components/fullpage.js/dist/jquery.fullpage.min.js',
      './bower_components/fullpage.js/dist/jquery.fullpage.min.js.map',
      './bower_components/fullpage.js/vendors/jquery.easings.min.js',
      './bower_components/fullpage.js/vendors/jquery.slimscroll.min.js',

      './bower_components/instantclick/instantclick.js',

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

gulp.task('vendor:css', () => {
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

gulp.task('vendor:font', () => {
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

gulp.task('vendor', (done) => {
  sequence(
    'vendor:js',
    'vendor:css',
    'vendor:font',
    done
  );
});

// javascript
gulp.task('jshint', () => {
  return gulp
    .src([
      assets.js + '**/*.js',
      '!' + assets.js + '**/*.min.js',
      '!' + assets.js + 'instantclick.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify(_.extend(notification, {
      message: 'jshint'
    })));
});

gulp.task('uglify', () => {
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

gulp.task('js', (done) => {
  sequence(
    'jshint',
    'uglify',
    done
  );
});

gulp.task('js:watch', () => {
  gulp.watch(assets.js + '**/*.js', [
    'js'
  ]);
});

// sass
gulp.task('sass', () => {
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

gulp.task('sass:watch', () => {
  gulp.watch(assets.sass + '**/*.{scss,sass}', [
    'sass'
  ]);
});

gulp.task('sassdoc', () => {
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
gulp.task('csslint', () => {
  return gulp
    .src([
      assets.css + 'style.css',
      '!' + assets.css + 'style.min.css'
    ])
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.formatter('compact'))
    .pipe(notify(_.extend(notification, {
      message: 'csslint'
    })));
});

gulp.task('cssnano', () => {
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

gulp.task('css', (done) => {
  sequence(
    'csslint',
    'cssnano',
    done
  );
});

gulp.task('css:watch', () => {
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
