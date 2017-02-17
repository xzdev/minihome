var path = require('path');
var webpack = require('webpack');

var srcPath = path.resolve(__dirname, 'src');

module.exports = {
    entry: srcPath + '/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            loader: 'babel-loader',
            query: {
                cacheDirectory: true
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: ['babel-loader', 'eslint-loader']
        }]
    },
    stats: {
        color: true,
        reasons: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
}