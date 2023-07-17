const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(webpackBase, {
  // 生产模式自动压缩html和js代码
  mode: "production",
  // 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能。
  // source-map打包会生成.map文件
  devtool: "source-map",
  optimization: {
    minimizer: [
      // 压缩css代码
      new CssMinimizerPlugin(),
      // 开启多进程压缩
      new TerserPlugin({
        parallel: webpackBase.threads,
      }),
    ],
  },
});
