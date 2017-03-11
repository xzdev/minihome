module.exports = {
    plugins: [
        require('precss'),
        require('postcss-import'),
        require("postcss-cssnext")({
            browsers: ['last 2 versions', 'ie >= 9'],
            compress: true,
        }),
    ]
}
