const path = require( 'path' );
const glob = require( 'glob' );
const http = require( 'http' );
const logging = require( 'webpack/lib/logging/runtime' );
const logger = logging.getLogger( 'wps' );
const HtmlPlugin = require( 'html-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const StylelintPlugin = require( 'stylelint-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const PurgeCssPlugin = require( 'purgecss-webpack-plugin' );
const SpriteLoaderPlugin = require( 'svg-sprite-loader/plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV, HOST, PORT } = process.env;
const isDev = NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';
const host = HOST || 'localhost';
const port = PORT || 3000;

const paths = {
	src: path.resolve( __dirname, 'src' ),
	html: path.resolve( __dirname, 'src', 'assets', 'html' ),
	build: path.resolve( __dirname, 'build' ),
};

let hbsData = require( './data' );
// const hbsData = {};

// Получение тестовых данных с mock-server
http.get( 'http://localhost:4000/pages/', res => {
	let rawData = '';

	res.setEncoding( 'utf8' );
	res.on( 'data', chunk => {
		rawData += chunk;
	} );
	res.on( 'end', () => {
		try {
			const { result } = JSON.parse( rawData );
			Object.assign( hbsData, result );
		} catch ( e ) {
			logger.info( `MockDataError: ${ e.message }` );
		}
	} );
} ).on( 'error', e => {
	logger.info( `MockDataError: ${ e.message }` );
} );

logger.info( `Mode: ${ mode }` );

const config = {
	mode,
	entry: {
		'legacy-main': './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: paths.build,
		// publicPath: '/', // криво работает с build
		// clean: true, // не работает вместе с devServer writeToDisk, баг не устранен на 27.09.2021, поставил clean-webpack-plugin
	},
	stats: {
		assets: true,
		modules: false,
	},
	target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
	devtool: isDev
		? 'eval-cheap-module-source-map'
		: false,
	devServer: {
		static: {
			publicPath: '/',
		},
		devMiddleware: {
			index: true,
			writeToDisk: true,
			publicPath: '/',
			stats: 'minimal',
		},
		client: {
			overlay: {
				errors: true,
				warnings: true,
			},
		},
		hot: false,
		host,
		port,
		proxy: {
			'/api': {
				target: 'http://localhost:4000',
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: '> 1%, last 2 versions, not dead',
										useBuiltIns: 'usage',
										loose: true,
										corejs: 3,
									},
								],
							],
							plugins: [
								[
									'@babel/plugin-proposal-class-properties',
									{
										loose: true
									}
								],
							],
						},
					}
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							spriteFilename: 'legacy-sprite.svg',
						},
					},
				],
			},
			{
				test: /\.s?css$/i,
				use: [
					// Creates `style` nodes from JS strings in dev
					// Or extract css to own files in prod
					isDev
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]'
				},
			},
			{
				test: /\.(mov|mp4|webm)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'video/[name][ext]'
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				},
			},
			{
				test: /\.hbs$/i,
				loader: 'handlebars-loader',
				options: {
					helperDirs: [
						path.resolve( paths.html, 'helpers' ),
					],
					partialDirs: [
						path.resolve( paths.html, 'includes' ),
					],
					inlineRequires: '@/assets/',
				},
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ESLintPlugin( {
			emitWarning: true,
		} ),
		new StylelintPlugin( {
			emitWarning: true,
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new SpriteLoaderPlugin( {
			plainSprite: true,
		} ),
		new CopyPlugin( {
			patterns: [
				{
					from: 'public',
					noErrorOnMissing: true,
				},
			],
		} ),
		...glob.sync( '**/*.hbs', {
			cwd: path.resolve( paths.html, 'views' ),
			nodir: true,
		} ).map( file => new HtmlPlugin( {
			filename: file.replace( '.hbs', '.html' ),
			template: path.resolve( paths.html, 'views', file ),
			data: hbsData,
		} ) ),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					test: /node_modules/,
					chunks: 'all',
					name: 'legacy-vendors',
					enforce: true,
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': paths.src,
		},
	},
}

if ( isDev ) {
	config.plugins.push(
		new BundleAnalyzerPlugin( {
			openAnalyzer: false,
		} ),
	);
} else {
	config.plugins.push(
		new PurgeCssPlugin( {
			paths: glob.sync( `${ paths.src }/**/*`, {
				nodir: true,
			} ),
		} ),
	);
}

module.exports = config;
