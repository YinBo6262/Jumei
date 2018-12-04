var gulp = require('gulp');
//加载各类gulp插件
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath: 'src/',
    devPath: 'build/',//开发目录
    prdPath: 'dist/' //生产目录
};
//操作包文件
gulp.task('lib', function () {
    //操作components下所有的js文件
    gulp.src('../compoents/jquery-1.12.4.min.js')
        //在build下创建vendor文件夹，并将包构建进去
        .pipe(gulp.dest(app.devPath + 'vendor'))
        //在dist下创建vendor文件夹，并将包构建进去
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        //通知浏览器自动刷新更改 低级浏览器不支持
        .pipe($.connect.reload());
});