let gulp = require("gulp");
let jade = require("gulp-jade");
let autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass'); // Конверстация SASS (SCSS) в CSS
let autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];

// SOURCES
let src = {
    scss: ["**/*.scss", "!node_modules/**/*.scss"],
    js: ["**/*.js", "!node_modules/**/*.js", "!gulpFile.js"],
    pages: ["pages/**/*.jade"],
    img: ["**/*.png", "**/*.jpg", "**/*.svg", "**/*.ico"]
}

let dist = {
    main: "../build/",
    img: "../build/img"
}

gulp.task("build", function() {
    //PAGES
    gulp.src(src.pages).pipe(jade({
        pretty: "\t"
    })).pipe(gulp.dest(dist.main));

    // IMG
    gulp.src(src.img).pipe(rename({
        dirname: ''
    })).pipe(gulp.dest(dist.img));

    //SCSS
    gulp.src(src.scss) // файл, который обрабатываем
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // конвертируем sass в css
        .pipe(concat("styles.css"))
        .pipe(autoprefixer({
            browsers: autoprefixBrowsers
        }))
        //.pipe(csso()) // минифицируем css, полученный на предыдущем шаге
        .pipe(gulp.dest(dist.main)); // результат пишем по указанному адресу

    //JS
    gulp.src(src.js).pipe(concat("script.js")).pipe(gulp.dest(dist.main));

    //FONTS
    gulp.src("fonts/**/*.*",  { base: './' }).pipe(gulp.dest(dist.main));
})

gulp.task("watch", ["build"], function() {
    gulp.watch(Object.values(src), ["build"]);
})
