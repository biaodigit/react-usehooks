const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = {
    mode: 'production',
    entry: {
        hooks: './src/lib/index.ts'
    }
}

module.exports = merge(baseConfig, config)