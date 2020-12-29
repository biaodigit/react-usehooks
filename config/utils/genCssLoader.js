const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssSuffixMap = new Map([
    ['', 'css'],
    ['sass', '(sc|sa|c)ss'],
    ['less', '(le|c)ss'],
    ['stylus', '(styl|css)']
])

const cssLoaders = function (opt) {
    const { css_pre, extract } = opt
    const cssLoader = {
        loader: "css-loader",
        options: {
            import: true,
            importLoaders: 2
        }
    }

    const postcssLoader = {
        loader: "postcss-loader",
        options: {
            ident: 'postcss',
            plugins: [
                require('autoprefixer')(), // 自动加前缀
                require('cssnano')() // 向前版本兼容
            ]
        }
    }

    let loaders = [cssLoader, postcssLoader]
    if (css_pre) loaders.push(`${css_pre}-loader`)
    loaders = extract ? [MiniCssExtractPlugin.loader].concat(loaders) : ["style-loader"].concat(loaders)

    return loaders
}

module.exports = function (opt) {
    const { css_pre } = opt
    const loaders = cssLoaders(opt)
    const rule = {
        test: new RegExp(`\\.${cssSuffixMap.get(css_pre)}$`),
        use: loaders
    }
    return rule
}
