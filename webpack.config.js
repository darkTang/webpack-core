const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/chunk-[contenthash].js",
    // 指定图片资源的输出目录，默认是[hash][ext][query]
    // assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  resolve: {
    fallback: {
      // require.resolve(path|moduleName) 返回路径/模块的绝对路径，如果是模块，它会从node_modules查找
      path: require.resolve("path-browserify"),
    },
    // Add `.ts` and `.js` as a resolvable extension.
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|bmp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        // 指定图片资源的输出目录，默认是[hash][ext][query]，也可以通过assetModuleFilename来设置
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      // 打包其他媒体资源
      {
        test: /\.(ttf|mp3|mp4)$/,
        type: "asset/resource",
        // 指定图片资源的输出目录，默认是[hash][ext][query]，也可以通过assetModuleFilename来设置
        generator: {
          filename: "media/[hash][ext][query]",
        },
      },
      // html-loader用于将HTML文件转换为JavaScript模块
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 会自动找babel的配置文件
        use: "babel-loader",
        // use: {
        //   loader: "babel-loader",
        //   // 可以直接这里配置预设，也可以在配置文件中写
        //   options: {
        //     presets: ["@babel/preset-env"],
        //   },
        // },
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "css/chunk-[contenthash].css",
    }),
    // 会自动应用.eslintrc.js的文件的配置
    new ESLintWebpackPlugin({
      // 只检查src下的文件
      context: path.resolve(__dirname, "src"),
    }),
  ],
  devServer: {
    hot: true,
  },
};
