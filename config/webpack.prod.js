const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = merge(webpackBase, {
  // 生产模式自动压缩html和js代码
  mode: "production",
  // 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能。
  // source-map打包会生成.map文件
  devtool: "source-map",
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // 打包优化
  optimization: {
    minimizer: [
      // 压缩css代码
      new CssMinimizerPlugin(),
      // 开启多进程压缩
      new TerserPlugin({
        parallel: webpackBase.threads,
      }),
    ],
    // 代码分割
    // 会将node_modules和import动态导入分别创建js单独文件
    splitChunks: {
      chunks: "all",
      // 其他都用默认值
      cacheGroups: {
        defaultVendors: {
          // 组名
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          priority: -10, // 权重（越大越高）
          reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中拆分出的模块，则它将被重用，而不是生成新的模块
          name: "node_modules-chunk", // 给打包后的js文件命名，默认为随机数字，这里的name会传给entry入口文件
        },
      },
    },
    // 缓存配置，会生产runtime文件，解决当一个文件发生变化，只有这一个文件缓存失效，而其他文件缓存依然有效
    runtimeChunk: true,
  },
});
