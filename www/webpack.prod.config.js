var { resolve } = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'eslint-loader']
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
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
};