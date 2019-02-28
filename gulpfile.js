var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var del = require('del');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var uglify = require('gulp-uglify');
var htmlmin = require("gulp-htmlmin");

gulp.task('clean:temp', async function () {
    await del(['temp/**/*'])
})

gulp.task('clean:build', async function () {
    await del(['dist/**/*', 'rev/**/*'])
});

gulp.task('css:sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('temp/css'))
})

gulp.task('css:min', function () {
    return gulp.src('temp/css/**/*')
        .pipe(minifyCSS({
            debug: true,
            compatibility: 'ie8'
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest('temp/css'))
})

gulp.task("css:version", async function () {
    return gulp.src('temp/css/**/*')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
})

gulp.task('js:min', function () {
    return gulp.src('src/scripts/**/*.js')
        .pipe(uglify())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest('temp/js'))
})

gulp.task('js:version', function () {
    return gulp.src('temp/js/**/*')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
})

gulp.task("build:css", gulp.series(['css:sass', 'css:min', 'css:version']));
gulp.task('build:js', gulp.series('js:min', 'js:version'))


// 替换html页面中的引用路径
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', '*.html', "src/page/**/*.html"])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
})

// 替换require.js中配置的js路径
gulp.task('revRequireJS', function () {
    return gulp.src(['rev/**/*.json', 'dist/js/require/*.js'])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(gulp.dest('dist/js/require'))
})

gulp.task('default', gulp.series('clean:build', gulp.parallel('build:js', 'build:css'), 'clean:temp', gulp.parallel('revRequireJS', 'revHtml')), function () {
    console.log('finish!');
});