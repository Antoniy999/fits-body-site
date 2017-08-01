const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');
const svgSprite = require('gulp-svg-sprite'),
	  svgmin = require('gulp-svgmin'),
	  cheerio = require('gulp-cheerio'),
	  replace = require('gulp-replace');

const config = {
    src: './src',
    css: {
        watch: '/precss/**/*.less',
        src: '/precss/styles.less',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    }
};

gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
            /*.pipe(sourcemaps.init())*/
            .pipe(preproc())
            /*.pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            */
            .pipe(gulp.dest(config.src + config.css.dest))
            .pipe(browserSync.reload({
                stream: true
            }));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.src + config.css.watch, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});

gulp.task('svgSpriteBuild', function () {
	return gulp.src(assetsDir + 'i/icons/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'../../../sass/_sprite.scss',
							template: assetsDir + "sass/templates/_sprite_template.scss"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest(assetsDir + 'i/sprite/'));
});