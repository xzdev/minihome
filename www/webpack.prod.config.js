var { resolve } = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

var srcPath = resolve(__dirname, 'src');

module.exports = {
    entry: [
        srcPath + '/main.js',
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
                        importLoaders: 1,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
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
            title: 'My Home Site',
            favicon: './favicon.ico',
            filename: 'index.html',
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'root',            
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        }),
        // new ExtractTextPlugin('styles.css'),
        // new StyleExtHtmlWebpackPlugin(),
    ],
};