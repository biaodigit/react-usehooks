const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = {
    mode: 'development',
    entry: {
        hooks: './src/lib/index.ts'
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 7000,
        hot: true,
        hotOnly: true,
        publicPath: '/',
        historyApiFallback: {
            index: '/index.html'
        }
    }
}

module.exports = merge(baseConfig, config)