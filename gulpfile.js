const { watch, series, src, dest, parallel } = require("gulp");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));

function cleanFunction() {
  return src("build/*").pipe(clean({ force: true }));
}

function jsFunction() {
  return src("src/**/*.js").pipe(babel()).pipe(uglify()).pipe(dest("build/"));
}

function sassFunction() {
  return src("src/**/*.scss").pipe(sass()).pipe(dest("build/"));
}

function htmlFunction() {
  return src("src/*.html").pipe(dest("build/"));
}

function imageFunction() {
  return src(["src/images/*.jpg","src/images/*.svg"]).pipe(dest("build/images/"));
}

function fontFunction() {
  return src("src/fonts/*.ttf").pipe(dest("build/fonts/"));
}

const buildFunction = series(
  cleanFunction,
  parallel(jsFunction, sassFunction, htmlFunction,imageFunction,fontFunction)
);

function watchFunction() {
  watch(["src/**/*.js", "src/**/*.scss", "src/*.html"], buildFunction);
}

exports.default = series(buildFunction, watchFunction);
