const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = {
    mode: 'development',
    entry: {
        app: './src/index.tsx'
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