const { notify_server } = require("browser-sync");
const { src, dest, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const watch = require("gulp-watch");
const notify = require("gulp-notify");
const del = require("del");
const uglify = require("gulp-uglify-es").default;

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./",
      notify_server: true,
      online: true,
    },
  });
}

function styles() {
  return src("./styles/*.scss")
    .pipe(
      sass().on(
        "error",
        notify.onError({
          message: "<%= error.message %>",
          title: "Sass Error!",
        })
      )
    )
    .pipe(concat("style.css"))
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } },
      })
    )
    .pipe(dest("./styles/"))
    .pipe(notify("SASS - хорошая работа!"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "./script.js", // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
  ])
    .pipe(concat("min.js")) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest("./")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}
function startwatch() {
  watch("./styles/*.scss", styles);
  watch("./*.js", scripts);
  watch("./*.html").on("change", browserSync.reload);
}

function buildcopy() {
  return src(["./styles/*.css", "./*.html", "./min.js"], { base: "./" }).pipe(
    dest("dist")
  );
}

function cleandist() {
  return del("dist/**/*", { force: true });
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.startwatch = startwatch;
exports.scripts = scripts;

exports.default = parallel(browsersync, styles, scripts, startwatch);
exports.build = series(cleandist, styles, scripts, buildcopy);
