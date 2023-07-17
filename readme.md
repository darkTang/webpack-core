# webpack_core
1. webpack 默认导入路径必须要带文件后缀。
2. vite 默认导入路径不需要带文件后缀，内部做了处理。
3. webpack 本身只能处理 js、json 文件。

## 1. 处理css
1. style-loader/MiniCssExtractPlugin.loader
2. css-loader

## 2. 处理less(yarn add less less-loader -D)
1. style-loader/MiniCssExtractPlugin.loader
2. css-loader
3. less-loader
> webpack没有内置less处理，需要下载less预处理器
> vite已经内置了less-loader，只需要下载less即可

## 3. 处理sass｜scss同less

## 4. 处理图片资源
1. webpack4需要file-loader（将图片资源打包成webpack能够认识的资源）和url-loader（再将图片资源进行base64处理）
2. webpack5内置了这两个功能，可以直接原封不动的打包，也可以自定义配置
3. asset/inline 导出一个资源的 data URI(base64)。之前通过使用 url-loader 实现。
4. asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
5. asset webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。当然也可以自定义配置。
6. asset只能解决静态资源，无法处理html中的图片资源
7. html-loader用于将HTML文件转换为JavaScript模块。具体来说，html-loader会将HTML文件中的<img>、<link>、<script>等标签中引用的资源（例如图片、样式表、JavaScript文件等）转换为Webpack模块，这时候再交给assetModule处理，可以解决img的src属性的路径问题

## 5. 处理esm和cjs
1. webpack.config.js在服务端运行，要使用cjs
2. vite.config.js可以用esm，因为vite内部会做处理将esm转化为cjs
3. webpack 5 不再自动引用 polyfill Node.js 的核心模块，这意味着如果你在浏览器或类似的环境中运行的代码中使用它们，你必须从 NPM 中安装兼容的模块，并自己包含它们。[配置](https://webpack.docschina.org/configuration/resolve/#resolvefallback)
4. webpack4是内置node核心模块的，但这为构建时给 bundle 附加了庞大的 polyfills。
5. require默认只能导入 .js\.json\.node文件，require导入图片资源需要经过webpack打包，原因是webpack将图片打包成依赖
6. require.resolve(path|moduleName) 返回路径/模块的绝对路径，如果是模块，它会从node_modules查找

## 6. 开启开发服务器(yarn add webpack-dev-server -D)
1. 开发服务器只能监测src下面的文件，不能监测webpack.config.js的文件变动，有热更新
2. webpack -w 也可以，但需要手动刷新浏览器，没有热更新

## 7. 处理其他媒体资源资源(字体图标、音视频等)
处理方式基本与处理图片资源一样，设置asset/resource

## 8. 处理js(eslint检查、babel降级等)
### 8.1 eslint检查(yarn add eslint eslint-webpack-plugin -D)
1. .eslintrc.js/.eslintrc
2. .eslintignore  配置vscode的eslint插件忽略检查哪些文件
3. webpack中的eslint是不会检查dist文件夹和node_modules文件夹的

### 8.2 babel(语法降级)

## 9. 处理ts(yarn add typescript ts-loader -D)
需要创建tsconfig.json文件