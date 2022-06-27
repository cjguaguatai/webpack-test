const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { userInfo } = require("os")


module.exports = {
    mode: 'development',
    entry: "./src/index.js", // 入口
    output: { 
        path: path.resolve(__dirname, "dist"), // 出口路径 绝对路径
        filename: "main.js" // 出口文件名
        // __dirname 可以用来动态获取当前文件所属目录的绝对路径
        // /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口
        
        // path.resolve(__dirname, "dist"),
        // /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口/dist
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
    module:{
        rules: [
            //处理css
            {
                test: /\.css$/,
                // loader 执行的顺序： use数组里从右向左运行
                // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
                // 再用 style-loader 将样式, 把css插入到dom中
                use:["style-loader", "css-loader"]
            },
            //处理less
            {
                test: /\.less$/, // 匹配执行类型的文件
                // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
              // 执行的顺序 less-loader css-loader style-loader
              // less-loader 先把less代码转换成css
              // css-loader 再把css代码转换成webpack 可以识别的js代码
              // style-loader 在把css代码插入到 dom中
                use: [ "style-loader", "css-loader", 'less-loader']
            },
            //webpack4处理图片
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: [
            //       {
            //         loader: 'url-loader', // 匹配文件, 尝试转base64字符串打包到js中
            //         // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
            //         options: {
            //           limit: 8 * 1024,
            //         },
            //       },
            //     ],
            // },
            //webpack5处理图片
            {
                // 图片文件的配置(仅适用于webpack5版本)
                test: /\.(png|jpg|gif|jpeg)$/i,
                type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
                // 如果你设置的是asset模式
                // 以8KB大小区分图片文件
                // 小于8KB的, 把图片文件转base64, 打包进js中
                // 大于8KB的, 直接把图片文件输出到dist下

                // type: 'asset/resource' // 发送一个单独的文件并导出 URL
                // type: 'asset/inline' // 导出一个资源的 data URI
            },
            //处理字体样式webpack5
            { // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font-[name].[hash:6][ext]'
                }
            },
            //处理字体样式webpack4
            { // 处理字体图标的解析
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 2 * 1024,
                                // 配置输出的文件名
                                name: '[name].[ext]',
                                // 配置输出的文件目录
                                outputPath: "fonts/"
                            }
                        }
                    ]
            },
            //处理高版本js语法
            {
                text:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
                    }
                }
            }

        ]
    }
}