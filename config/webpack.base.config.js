const path = require('path')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'

const config = {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, '../src/')
        }
    }
}

module.exports = config