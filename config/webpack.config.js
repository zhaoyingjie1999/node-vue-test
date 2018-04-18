const webpack = require('webpack')
const path = require('path')
const webpackHtmlPlugin = require('html-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const isDev = require('./config').ISDEV

var webpackConfig = {
    mode: 'development',
    entry: {
        app: [path.resolve(__dirname, '../src/main.js')],
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: [path.resolve(__dirname, '../src')],
                exclude: [path.resolve(__dirname, '../node_modules')],
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [{
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader'
                            }
                        ],
                        scss: [{
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
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
            'vue': 'vue/dist/vue.js',
            '@app': path.resolve(__dirname, '../app/'),
            '~api': path.resolve(__dirname, '../src/api'),
            '~utils': path.resolve(__dirname, '../src/utils')
        }
    },
    optimization: {
        minimize: !isDev,
        // splitChunks: {
        //     chunks: 'all',
        //     minSize: 30000,
        //     minChunks: 1,
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10
        //         },
        //     }
        // }
    },
    plugins: [
        // new webpack.DllPlugin({
        //     context: __dirname,
        //     manifest: require('./lib-config.json')
        // }),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static'),
            to: 'static',
            ignore: ['.*']
        }]),
        // new cleanWebpackPlugin([path.resolve(__dirname, '../dist/')]),
        new webpackHtmlPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}

if (isDev) {
    webpackConfig.entry.app.push('webpack-hot-middleware/client?reload=true&log=false&noInfo=true')
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    webpackConfig.plugins.push(new friendlyErrorsWebpackPlugin())
} else {
    webpackConfig.mode = 'production'
}


module.exports = webpackConfig