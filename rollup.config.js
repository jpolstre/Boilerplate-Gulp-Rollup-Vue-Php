//**rollup plugins */
const resolve = require('rollup-plugin-node-resolve')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const vue = require('rollup-plugin-vue2')
const postcss = require('rollup-plugin-postcss')
const { uglify } = require('rollup-plugin-uglify')
const multiInput = require('rollup-plugin-multi-input')
const del = require('rollup-plugin-delete')//gulp
// const copy = require('rollup-plugin-copy')//gulp
// const browserSync = require('rollup-plugin-browsersync')//gulp
// const phpServer = require('rollup-plugin-php-server')//gulp

//**postcss plugins */
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

//** Others config */

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)
// console.log(external)
const extensions = [ '.js', '.json', '.vue' ]
const isProduction = process.env.NODE_ENV ? process.env.NODE_ENV.trim() === 'production' : false
const globals = { vue: 'Vue' }

//*config rollup plugins*/
const plugins = [
	// del({ targets: [ 'dist/*.php' ] }),//gulp
	del({ targets: [ 'dist/js/*' ] }),

	// copy({//gulp
	// 	//esto para rollup solamente
	// 	targets: [
	// 		{ src: 'src/views/**', dest: 'dist' }
	// 		// { src: [ 'assets/fonts/arial.woff', 'assets/fonts/arial.woff2' ], dest: 'dist/public/fonts' },
	// 		// { src: 'assets/images/**/*', dest: 'dist/public/images' }
	// 	]
	// }),
	multiInput({ relative: 'src/js' }),

	isProduction &&
		uglify({
			toplevel: true,

			output: {
				beautify: false
			}
		}),

	resolve(),

	vue({
		template: {
			isProduction,
			compilerOptions: { preserveWhitespace: false }
		},
		css: false
	}),
	// scss({
	// 	output: 'dist/css/vueall.css'
	// }),
	postcss({
		//en vez de scss
		extract: 'dist/css/all.css',
		minimize: isProduction,
		plugins: [
			autoprefixer,
			tailwindcss,
			isProduction &&
				purgecss({
					content: [ 'src/views/**/*.php', 'src/js/**/*.vue' ], //las cleses del html que se analizaran. para no ser exluidas del bundle css que se construye.
					keyframes: true, //esto elimina los keyframes inutilizados de librrias como animate.css.
					fontFace: true, //elimina fuentes inutilizadas.
					// para que no elimine las clases generadas dinamicamente en vue.
					defaultExtractor: (content) => content.match(/[\w-/:]*[\w-/:]/g) || []
				})
		]
	}),

	buble(), //en vez de babel
	// babel({
	// 	exclude: 'node_modules/**'
	commonjs({
		extensions
	})

	// phpServer({//gulp
	// 	port: 7000
	// }),
	// browserSync({
	// 	proxy: 'localhost:7000/dist',
	// 	watch: true,
	// 	codeSync: true,
	// 	files: [
	// 		{
	// 			match: [ 'src/views/**/*.php' ],
	// 			fn: function(event, file) {
	// 				console.log(event)
	// 			}
	// 		}
	// 	]
	// })
]

// chokidar.watch([ 'src/views/**' ]).on('change', (event, path) => {
// 	console.log(event, path)
// 	browserSync.bind()
// })

module.exports = {
	external,
	plugins,
	// input: 'src/js/main.js'
	input: [ 'src/js/**/*.js' ], //multi entry plugin
	output: {
		globals,
		dir: 'dist/js', //multi entry
		// file: 'dist/js/all.js',
		format: 'system' //para navegadores antiguos(necesario constar system y  en el html), 'es'->para navegadores modernos.
		// name: 'library',
		// sourcemap: true
	},
	// cache: !isProduction,
	watch: {
		clearScreen: true,
		exclude: 'node_modules/**',
		include: [ 'src/js/**', 'tailwind.config.js', 'src/css/**', 'src/views/**' ]
	}
}
