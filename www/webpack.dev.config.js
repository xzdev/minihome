var { resolve } = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

var srcPath = resolve(__dirname, 'src');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        srcPath + '/main.js',
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: "pre",
            loader: 'eslint-loader'
        }, {
            test: /\.(js|jsx)$/,
            include: srcPath,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'eslint-loader'],
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        camelCase: 'dashes',
                        sourceMap: true,
                        importLoaders: 1,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'sass-loader',
                }],
            })
        }]
    },
    stats: {
        color: true,
        reasons: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'root',
            devServer: 'http://localhost:3000',
            title: 'My Home Site',
            favicon: './favicon.ico',
            filename: 'index.html',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHarddiskPlugin(),
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        }),
        // new ExtractTextPlugin('styles.css'),
        // new StyleExtHtmlWebpackPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:3000/'
    },
};