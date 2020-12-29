const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = {
    mode: 'production',
    entry: {
        app: './src/index.tsx'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].chunk.css'
        })
    ]
}

module.exports = merge(baseConfig, config)