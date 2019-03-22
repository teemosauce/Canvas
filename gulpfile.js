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
var imagemin = require('gulp-imagemin'); // 图片压缩

gulp.task('clean:build', async function () {
    await del(['dist/**/*'])
});

// 处理css
gulp.task("build:css", function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) // 转换sass到css
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        })) //兼容性
        .pipe(minifyCSS({
            debug: true,
            compatibility: 'ie8'
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        })) // 压缩css代码
        .pipe(rev()) // 生成文件版本号
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest('css-manifest.json'))
        .pipe(gulp.dest('dist/rev'))
});

// 处理js
gulp.task('build:js', function () {
    return gulp.src('src/script/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/script'))
        .pipe(rev.manifest('js-manifest.json'))
        .pipe(gulp.dest('dist/rev'))
});

// 压缩图片
gulp.task('image:min', function () {
    return gulp.src('src/asset/**/*.{png,jpg,gif,ico}')
        // .pipe(imagemin())
        .pipe(gulp.dest("dist/asset"))
})

// 复制字体文件
gulp.task("copy:fonts", function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task("copy:vendor", function () {
    return gulp.src("src/vendor/**/*")
        .pipe(gulp.dest("dist/script/vendor"))
})

gulp.task("copy:others", function () {
    return gulp.src(["site.webmanifest"])
        .pipe(gulp.dest("dist"))
})

gulp.task("copy", gulp.parallel("copy:fonts", "copy:vendor", "copy:others"));

// 替换html页面中的引用路径并压缩
gulp.task('htmlreplace', function () {
    return gulp.src(['dist/rev/*.json', '*.html', 'src/page/**/*.html'])
        .pipe(revCollector({
            replaceReved: true,
        }))
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     empty: true,
        //     spare: true,
        //     minifyCSS: true,
        //     minifyJS: true
        // }))
        .pipe(gulp.dest('dist'))
})

// 替换require.js中配置的js路径
gulp.task('rjsreplace', function () {
    return gulp.src(['dist/rev/*.json', 'dist/script/*.js'])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(gulp.dest('dist/script'))
})

gulp.task('default', gulp.series('clean:build', gulp.parallel('build:js', 'build:css', 'image:min'), 'copy', 'htmlreplace', 'rjsreplace'), function () {
    console.log('finish!')
})

gulp.task("watch", function () {
    gulp.watch(['src/**/*', 'index.html'], gulp.series('clean:build', gulp.parallel('build:js', 'build:css', 'image:min'), 'copy', 'htmlreplace', 'rjsreplace'))
})