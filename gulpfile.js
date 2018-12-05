var gulp = require('gulp')
var less = require('gulp-less');
var cleancss = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
// var babel = require("gulp-babel");
var bs = require("browser-sync").create();

var cssmin = require("gulp-cssmin");
var app = {
    srcPath: './src/',
    prdPath: './dist/' //生产目录
};



gulp.task("less", function(){
    gulp.src(app.srcPath + 'less/*.less')
        .pipe( less() )
        .pipe( autoprefixer({
            browsers: ['last 2 versions']
        }) )
        .pipe( gulp.dest(app.prdPath+'css') )
        .pipe( cleancss() )
        .pipe( rename({
            suffix: ".min"
        }) )
        .pipe( gulp.dest(app.prdPath+'css') )
        .pipe( bs.reload({
            stream: true
        }) );
});

gulp.task("scripts", function(){
    gulp.src(app.srcPath +"js/*.js")
        .pipe( uglify() )
        .pipe( gulp.dest(app.prdPath +"js") );
});

gulp.task("images", function(){
    gulp.src(app.srcPath +"images/*.{png,jpg,gif}")
        .pipe( cache(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })) )
        .pipe( gulp.dest(app.prdPath +"images") );
});

gulp.task("html", function(){
    gulp.src(app.srcPath + "**/*.html")
        .pipe( fileinclude({
            basepath: "src/html"
        }) )
        .pipe( htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }) )
        .pipe(gulp.dest(app.prdPath));
});

gulp.task("serve", function(){
    bs.init({
        server: {
            baseDir: 'dist'
        },
        startPath: "index.html"
    })
});

gulp.task("refresh", function(){
    bs.reload();
});

gulp.task('watch',function(){
    gulp.watch(app.srcPath+"**/*.html", ["html", "refresh"]);
    gulp.watch(app.srcPath+"less/*.less", ["less"]);
    gulp.watch(app.srcPath+"js/*.js", ["scripts", "refresh"]);
    gulp.watch(app.srcPath+"images/*", ["images", "refresh"]);
});


gulp.task("default", ["html", "lessc", "scripts", "images"], function(){
    gulp.run("serve", "watch");
});