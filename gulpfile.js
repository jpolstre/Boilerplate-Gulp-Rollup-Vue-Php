const gulp = require('gulp')
const cfgRollup = require('./rollup.config')
const rollup = require('rollup')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync')
const phpServer = require('gulp-connect-php')
// const del = require('del')
const clean = require('gulp-clean')

//* output rollup config*/
const output = {
	globals: { vue: 'Vue' },
	dir: 'dist/js', //multi entry
	// file: 'dist/js/all.js',
	format: 'system' //para navegadores antiguos(necesario constar system y  en el html), 'es'->para navegadores modernos.
	// name: 'library',
	// sourcemap: true
}

// *Rollup build, .js, .vue, .css (tailwindcss, postcss)**/
gulp.task('build', async (done) => {
	// es como ejecutar rollup -c -w
	const bundle = await rollup.rollup(cfgRollup) //rollup.rollup
	await bundle.write(output)

	browserSync.reload()
	done()
})

//**clean task */
gulp.task('clean', function() {
	return gulp.src('dist/**/*.php', { read: false }).pipe(clean({ force: true }))
})

//**php task */
gulp.task(
	'php',
	gulp.series('clean', () => {
		return gulp
			.src('src/views/**/*.php')
			.pipe(
				htmlmin({
					collapseWhitespace: true,
					// ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/ ],//esto evita comprimir los bloques php.
					removeComments: true
				})
			)
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream())
	})
)

//** Server task*/
gulp.task('serve', () => {
	phpServer.server({ port: 7000 }, () => {
		browserSync.init({
			proxy: 'localhost:7000/dist',
			open: true // ('external' ?) INJECTA el script de reload EN TODO EL DOMINIO. Ojo las paginas php que se refrescan deben tener html head body
		})
	})
	gulp.watch([ 'src/js/**/*.*', 'src/css/**', 'tailwind.config.js' ], gulp.series('build'))
	gulp.watch([ 'src/views/**/*.php' ], gulp.series('php'))
})

gulp.task('default', gulp.series('build', 'php', 'serve'))
