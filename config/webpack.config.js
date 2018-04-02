const webpack = require('webpack')
const path = require('path')
const webpackHtmlPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: [path.resolve(__dirname, '../src')],
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [{
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader'
                            }
                        ],
                        scss: [{
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ],
                        js: [{
                            loader: 'babel-loader'
                        }]
                    }
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.css', '.vue'],
        alias: {
            '@app': path.resolve(__dirname, '../app/')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static'),
            to: 'static',
            ignore: ['.*']
        }]),
        // new cleanWebpackPlugin([path.resolve(__dirname, '../dist/')]),
        new webpackHtmlPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunks: [
                'app'
            ]
        })
    ]
}