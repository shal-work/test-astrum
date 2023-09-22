"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const clean = require('gulp-clean');



// const dist = "c:/xampp/htdocs/elementor2"; // Ссылка на вашу папку на локальном сервере
const dist = "./dist";
const prod = "./prod";

gulp.task("copy-html", () => {
    // return gulp.src("./src/index.html")
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});


gulp.task("build-sass", () => {
    return gulp.src("./src/assets/sass/style.scss")
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
  return gulp.src("./src/assets/**/*.*")
              .pipe(gulp.dest(dist + "/assets"))
              .on("end", browsersync.reload);
});


gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    // gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/assets/sass/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-sass", "build-js"));

gulp.task("product", () => {
    gulp.src("./src/assets/sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(prod));
        return gulp.src("./src/js/main.js")
            .pipe(webpack({
                mode: 'production',
                output: {
                    filename: 'script.js'
                },
                module: {
                    rules: [
                      {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                          loader: 'babel-loader',
                          options: {
                            presets: [['@babel/preset-env', {
                                corejs: 3,
                                useBuiltIns: "usage"
                            }]]
                          }
                        }
                      }
                    ]
                  }
            }))
            .pipe(gulp.dest(prod)),
            //  gulp.src("./src/index.html")
             gulp.src("./src/*.html")
            .pipe(gulp.dest(prod))
            .pipe(browsersync.stream());
});

//сам добавил
gulp.task("copy-img", () => {
  return gulp.src("./dist/assets/img/*.*")
              .pipe(gulp.dest(prod + "/assets/img"))
              .on("end", browsersync.reload);
});
// сам добавил для animate.css
gulp.task("copy-css", () => {
  return gulp.src("./dist/assets/css/*.css")
              .pipe(gulp.dest(prod + "/assets/css"))
              .on("end", browsersync.reload);
});

// сам добавил для audio
gulp.task("copy-audio", () => {
  return gulp.src("./dist/assets/audio/*.*")
              .pipe(gulp.dest(prod + "/assets/audio"))
              .on("end", browsersync.reload);
});

//сам добавил
gulp.task("copy-fonts", () => {
  return gulp.src("./dist/assets/fonts/*.*")
              .pipe(gulp.dest(prod + "/assets/fonts"))
              .on("end", browsersync.reload);
});

gulp.task('clean-img', () => {
	return gulp.src('./prod/assets/img/*.*', {read: false})
		.pipe(clean());
});

gulp.task("prod", gulp.parallel("clean-img", "product", "copy-img", "copy-fonts", "copy-audio"));
gulp.task("default", gulp.parallel("watch", "build"));