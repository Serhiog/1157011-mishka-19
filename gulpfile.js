"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var sprite = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var minhtml = require("gulp-htmlmin");
var minjs = require("gulp-uglify")

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });
  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("posthtml", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{jpg, png}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp
    .src("source/img/icon-*.svg")
    .pipe(sprite({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("posthtml", function () {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**",
    "source/*ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
})

gulp.task("clean", function () {
  return del("build");
})

gulp.task("minhtml", function () {
  return gulp.src("build/*.html")
    .pipe(minhtml({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("minjs", function () {
  return gulp.src("build/js/script.js")
    .pipe(minjs())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("build", gulp.series("clean", "copy", "css", "images", "webp", "posthtml", "minhtml", "minjs"));
gulp.task("start", gulp.series("build", "server"));
