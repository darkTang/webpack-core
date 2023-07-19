const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const os = require("os");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

// 获取cpu核数
const threads = os.cpus().length;

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/chunk-[contenthash].js",
    // 指定所有静态资源的输出目录，默认是[hash][ext][query]
    // assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  resolve: {
    fallback: {
      // require.resolve(path|moduleName) 返回路径/模块的绝对路径，如果是模块，它会从node_modules查找
      path: require.resolve("path-browserify"),
    },
    // Add `.ts` and `.js` as a resolvable extension.
    //  根据顺序会先去查找.js文件，存在即导入，不存在再去查找.ts文件，如果都查不到，则会报错
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              // {
              //   loader: "postcss-loader",
              //   options: {
              //     postcssOptions: {
              //       plugins: ["postcss-preset-env"],
              //     },
              //   },
              // },
              // 这样配置会自动找postcss.config.js配置文件
              "postcss-loader",
            ],
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              // postcss-loader要在css-loader前面，less-loader后面
              // {
              //   loader: "postcss-loader",
              //   options: {
              //     postcssOptions: {
              //       plugins: ["postcss-preset-env"],
              //     },
              //   },
              // },
              "postcss-loader",
              "less-loader",
            ],
          },
          {
            test: /\.s[a|c]ss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp|bmp)$/,
            type: "asset", // 不写parser，默认为8kb
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
            enforce: "post",
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            // 会自动找babel的配置文件
            // loader: "babel-loader",
            // use: {
            //   loader: "babel-loader",
            //   // 可以直接这里配置预设，也可以在配置文件中写
            //   options: {
            //     presets: ["@babel/preset-env"],
            //   },
            // },
            use: [
              // 放在babel-loader前面
              {
                loader: "thread-loader",
                options: {
                  workers: threads,
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭缓存文件压缩，否则会影响打包速度
                },
              },
            ],
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: "ts-loader",
          },
        ],
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
      chunkFilename: "css/[name]-chunk-[contenthash:10].css", // 动态导入css文件命名，与动态引入js类似
    }),
    // 会自动应用.eslintrc.js的文件的配置
    new ESLintWebpackPlugin({
      // 只检查src下的文件  eslint默认开启缓存
      context: path.resolve(__dirname, "src"),
      // 开启eslint多线程
      threads,
    }),
    new VueLoaderPlugin(),
    // vue3中是否需要支持选项式API和devtools
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false,
      // 定义环境变量
      // 因为在 webpack 中，所有的环境变量都会被当作字符串来处理，如果你不使用 JSON.stringify 方法来转换变量的值，那么在 webpack 中，这个变量的值可能会被当作一个未定义的变量来处理，从而导致编译错误。
      process: {
        erv: {
          NODE_ENV: JSON.stringify("development"),
        },
      },
    }),
  ],
  // 开启开发服务器，则不会输出资源，在内存中编译打包
  devServer: {
    open: true,
    // 开启热模替换
    hot: true,
    host: "localhost",
    port: 8080,
  },
};
