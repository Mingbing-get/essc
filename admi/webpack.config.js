//运行命令 npx webpack --config webpack.config.js
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
module.exports = {
    entry: './index/app.js',
    output:{
        filename: 'index.js'
    },
    resolve:{
      alias:{
          "vue$":"vue/dist/vue.js",
          "jquery":"jquery"
      }
    },
    plugins : [
        new vueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"//这里是增加的
        })
    ],
    module : {
        rules : [
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'}
        ]
    },
    performance: {
        hints: 'error',
        maxAssetSize: 3000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 5000000 // 整数类型（以字节为单位）
    }
}