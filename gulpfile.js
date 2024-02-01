import pkg from "gulp";
import less from "gulp-less";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import posthtml from "gulp-posthtml";
import include from "posthtml-include";
import autoprefixer from "autoprefixer";
import htmlmin from "gulp-htmlmin";
import minify from "gulp-csso";
import uglify from "gulp-uglify";
import svgstore from "gulp-svgstore";
import rename from "gulp-rename";
import { stream, init } from "browser-sync";
import del from "del";
import pump from "pump";

const { task, src, dest, watch, series } = pkg;

task("style", function(done) {
  src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(dest("build/css"))
    .pipe(stream());
    done();
});

task("sprite", function(){
  return src("source/img/icon-*.svg")
    .pipe(svgstore ({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(dest("build/img"));
});

task("html", function() {
  return src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(posthtml([
      include()
    ]))
    .pipe(dest("build"));
})

task("js", function(cb) {
  pump([
    src("source/js/**/*.js"),
    uglify(),
    dest("build/js")
  ],
  cb
  );
});

task("images", function() {
  return src("source/img/**/*.{png,jpg}")
    .pipe(dest("source/img"));
});

task("serve", function() {
  init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  watch("source/less/**/*.less", series("style"));
  watch("source/*.html", series("html"));
  watch("source/js/**/*.js", series("js"));
});

task("copy", function() {
  return src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(dest("build"));
});

task("clean", function() {
  return del("build");
});

task("build", series("clean", "copy", "style", "images", "sprite","html", "js"));
