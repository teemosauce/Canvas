// gulp实战
var gulp = require('gulp');
var sass = require('gulp-sass'); // sass 转 css
var autoprefixer = require('gulp-autoprefixer'); // 浏览器兼容前缀
var minifyCSS = require('gulp-clean-css'); // 压缩CSS
var del = require('del'); //文件删除
var rename = require('gulp-rename'); //文件重命名
var rev = require('gulp-rev'); // 1.根据文件内容生成文件指纹名称 2.生成一份生成后的配置文件
var revCollector = require('gulp-rev-collector'); //根据rev生成的配置 替换指定文件里面引用的路径名称
var uglify = require('gulp-uglify'); // js的压缩混淆
var htmlmin = require("gulp-htmlmin"); // html的压缩
var sourcemaps = require("gulp-sourcemaps"); // 生成sourcemap文件 方便调试

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

// 复制字体文件

gulp.task("copy", function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
})

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

gulp.task('default', gulp.series('clean:build', gulp.parallel('build:js', 'build:css', 'copy'), 'clean:temp', gulp.parallel('revRequireJS', 'revHtml')), function () {
    console.log('finish!')
})

gulp.task("watch", function () {
    gulp.watch(['src/**/*', 'index.html'], gulp.series('clean:build', gulp.parallel('build:js', 'build:css', 'copy'), 'clean:temp', gulp.parallel('revRequireJS', 'revHtml')))
})