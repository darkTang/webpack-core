const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // 多入口，默认情况下有几个入口就有几个输出
  entry: {
    app: "./src/app.js",
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js", // [name] 表示以文件名自己命名，这样写可以兼容多入口，防止命名冲突
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块进行分割
      // 下面的是默认配置
      // chunks: "async",
      // minSize: 20000,  // 分割代码最小大小20kb
      // minRemainingSize: 0,  // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1,  // 至少被引用的次数，满足条件才会代码分割，相当于做少需要两个入口文件
      // maxAsyncRequests: 30,  // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: {  // 哪些模块要打包到一个组
      //   defaultVendors: {  // 组名
      //     test: /[\\/]node_modules[\\/]/,  // 需要打包到一起的模块 [\\/]是为了避免有的路径分隔符为 / 或 \
      //     priority: -10,  // 权重（越大越高）
      //     reuseExistingChunk: true,  // 如果当前chunk包含已从主bundle中拆分出的模块，则它将被重用，而不是生成新的模块
      //     name: "node_modules", 给打包后的js文件命名，默认为随机数字
      //   },
      //   共同依赖
      //   default: {  // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2,  // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      cacheGroups: {
        default: {
          minSize: 0, // 因为我们定义的文件体积大小了，因此我们修改打包的最小体积
          minChunks: 2, // 这里的minChunks权重更大
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  mode: "production",
};
