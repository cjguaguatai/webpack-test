const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: "./src/index.js", // 入口
    output: { 
        path: path.resolve(__dirname, "dist"), // 出口路径 绝对路径
        filename: "main.js" // 出口文件名
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html', // 告诉webpack使用插件时, 以我们自己的html文件作为模板去生成dist/html文件
            filename: 'index.html' // 生成文件的名称
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: 3000, // 端口号
        open: true
    },
    
}
// __dirname 可以用来动态获取当前文件所属目录的绝对路径
// /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口

// path.resolve(__dirname, "dist"),
// /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口/dist