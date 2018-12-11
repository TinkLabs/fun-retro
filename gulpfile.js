var gulp = require("gulp"),
  clean = require("gulp-clean"),
  concat = require("gulp-concat"),
  gp_rename = require("gulp-rename"),
  concatCss = require("gulp-concat-css"),
  uglifycss = require("gulp-uglifycss"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer");


var buildHTML = function() {
  gulp.src("index.html").pipe(gulp.dest("dist"));
  gulp.src("components/*").pipe(gulp.dest("dist/components"));
};

var bundleVendorCSS = function() {
  gulp
    .src([
      "node_modules/font-awesome/css/font-awesome.min.css",
      "stylesheets/vendor/*.css"
    ])
    .pipe(concatCss("vendor.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(uglifycss())
    .pipe(gulp.dest("dist/css"));
};

var processSass = function() {
  gulp
    .src(["stylesheets/main.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gp_rename("main.css"))
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(gulp.dest("dist/css"));
};

var bundleVendorJS = function() {
  gulp
    .src([
      "js/vendor/jquery-3.2.1.min.js",
      "node_modules/angular/angular.min.js",
      "js/vendor/firebase.js",
      "js/vendor/firebaseInitialization.js",
      "node_modules/angularfire/dist/angularfire.min.js",
      "node_modules/angular-*/**/angular-*.min.js",
      "node_modules/core-js/client/shim.min.js",
      "!node_modules/**/angular-mocks.js",
      "js/vendor/*.js",
      "node_modules/ng-dialog/**/ngDialog*.min.js",
      "node_modules/ng-file-upload/**/ng-file-upload-all.min.js",
      "node_modules/papaparse/papaparse.min.js",
      "node_modules/clipboard/dist/clipboard.min.js",
      "node_modules/vanilla-emoji-picker/dist/emojiPicker.min.js",
      "node_modules/jspdf/dist/jspdf.min.js"
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("dist"));
};

var minifyJS = function() {
  gulp
    .src(["js/*.js", "js/**/*.js", "!js/vendor/*.js"])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist"));
};

gulp.task("clean-dist", function() {
  return gulp.src("dist/*", { read: false }).pipe(clean());
});

gulp.task("bundle", function() {
  bundleVendorCSS();
  bundleVendorJS();
  processSass();
  minifyJS();
});


gulp.task("copy", function() {
  gulp
    .src("node_modules/roboto-fontface/fonts/*{Regular,Bold}.*")
    .pipe(gulp.dest("dist/fonts"));
  gulp
    .src("node_modules/font-awesome/fonts/*.{woff,woff2,eot,svg,ttf}")
    .pipe(gulp.dest("dist/fonts"));
  gulp.src("img/*").pipe(gulp.dest("dist/img"));
  gulp.src("favicon.ico").pipe(gulp.dest("dist"));
  gulp.src("firebase.json").pipe(gulp.dest("dist"));
  gulp.src("README.md").pipe(gulp.dest("dist"));
  gulp.src("CNAME").pipe(gulp.dest("dist"));

  buildHTML();
});
gulp.task("default", ["bundle", "copy"]);
