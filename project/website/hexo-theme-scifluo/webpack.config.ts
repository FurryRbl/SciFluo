import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import localPostcssOptions from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { WebpackConfiguration } from 'webpack-dev-server';
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';
import { EsbuildPlugin, type LoaderOptions } from 'esbuild-loader';

export default (env: Record<string, unknown>) => {
	const isDevelopmentMode = env.WEBPACK_SERVE?.toString() === 'true';

	const esbuildOption: LoaderOptions = {
		format: 'esm',
		charset: 'utf8',
		target: 'ES2022',
		logLevel: 'info',
		treeShaking: true,
		platform: 'browser',
		legalComments: 'eof',
	};

	return {
		entry: {
			scifluo: path.resolve('./src/main.ts'),
			clarity: path.resolve('./src/clarity.ts'),
		},
		output: {
			publicPath: '/',
			path: path.resolve('source'),
			filename: 'assets/js/[name].bundle.js',
			library: {
				type: 'umd2',
			},
		},
		devServer: {
			hot: true,
			port: 8200,
			open: false,
			host: '127.0.0.1',
			static: {
				directory: path.resolve('./public'),
			},
			proxy: [
				{
					context: ['/'],
					target: 'http://127.0.0.1:8201/',
					changeOrigin: true,
					pathRewrite: { '^/': '' },
				},
			],
		},
		cache: {
			type: 'filesystem',
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
					],
				},
				{
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
						'less-loader',
					],
				},
				{
					test: /\.(woff|woff2)$/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/fonts/[name][hash][ext]',
					},
				},
				{
					test: /\.ts$/,
					loader: 'esbuild-loader',
					exclude: /node_modules/,
					options: {
						loader: 'ts',
						...esbuildOption,
					},
				},
				{
					test: /\.js$/,
					loader: 'esbuild-loader',
					exclude: /node_modules/,
					options: {
						loader: 'js',
						...esbuildOption,
					},
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
			],
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename: 'assets/css/[name].css',
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('./public'),
						to: path.resolve('./source'),
					},
				],
			}),
			env.analyze ? new BundleAnalyzerPlugin() : undefined,
		],
		optimization: {
			usedExports: true,
			sideEffects: true,
			avoidEntryIife: true,
			providedExports: true,
			removeEmptyChunks: true,
			flagIncludedChunks: true,
			removeAvailableModules: true,
			minimize: isDevelopmentMode ? false : true,
			minimizer: [
				new JsonMinimizerPlugin(),
				new EsbuildPlugin({
					...esbuildOption,
					minify: true,
					minifySyntax: true,
					minifyWhitespace: true,
					minifyIdentifiers: true,
					drop: ['console', 'debugger'],
				}),
				new CssMinimizerPlugin({
					minimizerOptions: {
						preset: [
							'default',
							{
								discardDuplicates: true,
								mergeRules: true,
								mergeMedia: true,
								level: {
									1: {
										specialComments: 'none',
									},
									2: {
										removeUnused: true,
									},
								},
							},
						],
					},
				}),
			],
		},
		stats: isDevelopmentMode ? 'minimal' : 'normal',
		devtool: isDevelopmentMode ? 'eval-cheap-module-source-map' : false,
	} satisfies WebpackConfiguration;
};
