var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require("gulp-clean-css");
var del = require("del");
var rename = require("gulp-rename");
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task("clean:build", async function () {
    await del(["dist/**/*"])
});

gulp.task("sass", function () {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(minifyCSS({
            debug: true,
            compatibility: 'ie8'
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(rev())
        .pipe(gulp.dest("dist/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/css'))
})

gulp.task("revcss", function () {
    return gulp.src(['*.html'])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task("default", gulp.series("clean:build", "sass", "revcss"), function () {
    console.log("finish!");
});