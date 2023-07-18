# 一、webpack基础配置
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
  
## 10. 样式兼容性处理(yarn add postcss-loader postcss postcss-preset-env -D)
1. 告知 webpack 为目标(target)指定一个环境。默认值为 "browserslist"，如果没有找到 browserslist 的配置，则默认为 "web"
2. package.json配置browserslist
3. [browserslist](https://zqianduan.com/pages/browserslist-config.html#%E8%83%8C%E6%99%AF)
```json
// webpack会给以下浏览器做兼容性处理
"browserslist": [
  "> 1%",   // 全球超过1%人使用的浏览器
  "last 2 versions" // 所有浏览器兼容到最后两个版本根据 CanIUse.com 踪的版本
]
```

## 11. 处理vue2(yarn add vue@2 vue-template-compiler@2 vue-loader@15 -D)
1. html-loader和vue-loader同时存在需要注意要将vue-loader放在前面，或者让html-loader加上enforce: 'post'，表示该loader置后
2. enforce: "pre"|"post"

## 12. 处理Vue3(yarn add vue vue-loader @vue/compiler-sfc -D)
1. 不能处理<script lang="ts" setup></script>写法，可以处理
```vue
export default {
  setup() {

  }
}
```
2. 其中 __VUE_OPTIONS_API__ 和 __VUE_PROD_DEVTOOLS__ 对应的值都是 Boolean 类型，分别代表的是：__VUE_OPTIONS_API__：表示是否支持 options api 的写法，默认是 true；__VUE_PROD_DEVTOOLS__：表示生产包是否要继续支持 devtools 插件，默认是 false；即便它们都有默认值，可以不进行设置，但是 Vue 希望我们自己去设置这两个配置，毕竟如果完全拥抱 Vue3 的话，写法上没有必要在使用 options api 的格式，这样在打包的时候，包的体量上也会有所减少.

# 二、webpack高级配置
## 1. 开发环境和生产环境的sourceMap
1. 路径问题：相对路径还是相对于项目根目录而言，但是绝对路径是相当于当前目录
2. 生产模式自动压缩html和js代码
3. css-minimizer-webpack-plugin用来压缩css代码
4. sourceMap 开发模式下建议inline-source-map/cheap-module-source-map，生产模式建议source-map
5. inline-source-map会将source map作为Data URI嵌入到编译后的文件中，因此生成的文件体积会比较大。但是由于包含了完整的source map信息，因此可以提供最高的精度，可以精确到每一行每一列的位置。
6. cheap-module-source-map则会生成一个单独的source map文件，不会将其嵌入到编译后的文件中。生成的source map只包含行信息，不包含列信息，因此精度相对较低。但是由于不包含列信息，因此生成的文件体积会比较小。

## 2. HMR/热模替换
1. 在程序运行中，替换、添加或删除模块，而无需重新加载整个页面
2. devServer开启hot: true; 只能让css进行HMR
3. JS要想开启HMR，需要在main.js中配置
```js
// 判断是否支持热模替换，实际开发中，vue和react已经帮我们做js的处理
if (module.hot) {
  module.hot.accept("./js/count.js");
  // 第二个参数传入一个函数，当文件发生变化时，调用函数
  // module.hot.accept("./js/count.js", function(...args) {
  //   console.log(args);
  // });
}
```

## 3. oneOf 
1. 对于loader规则而言，成功匹配后，还会继续往下查找loader，效率低
2. oneOf--规则数组，当规则匹配时，只使用第一个匹配规则。
3. vue-loader不允许放在oneOf中，需要放在oneOf前面

## 4. include/exclude
1. 开发时我们需要使用第三方的库或插件，所有文件都下载到node_modules中了，而这些文件是不需要编译可以直接使用的。所以在对js文件进行处理时，要排除node_modules下面的文件。
2. include和exclude只能使用一个，同时使用会报错

## 5. cache缓存
每次打包js文件都需要经过eslint检查和babel编译，速度比较慢。我们可以缓存之前的eslint检查和babel编译，这样二次打包速度就会更快。

1. eslint会默认开启缓存
2. babel需要配置
```js
options: {
  cacheDirectory: true, // 开启babel缓存
  cacheCompression: false, // 关闭缓存文件压缩，包速度
},
```

## 6. thread多线程打包(yarn add thread-loader -D)
对js文件的处理主要就是eslint、babel、terser(webpack内置，生产模式下会开启进行js文件压缩)三个工具，我们可以开启多进程同时处理js文件。
注意：仅在特别耗时的操作中使用，因为每个进程启动需要大约600ms左右的开销。

1. webpack v5 开箱即带有最新版本的 terser-webpack-plugin。如果你使用的是 webpack v5 或更高版本，同时希望自定义配置，那么仍需要安装terser-webpack-plugin。如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本。
2. thread-loader要放在babel-loader前面，也就是说先执行baber-loader，然后再运行thread-loader

## 7. tree shaking减少打包体积
开发时我们定义了一些工具函数库，或者饮用、、引用第三方工具函数库或组件库。如果没有特殊处理，我们打包时会引入整个库，但是实际上我们可能只用上一小部分。
1. tree shaking用来一出JS中没有用到的代码。
2. 它依赖于esm。
3. webpack默认开启这个功能。

## 8. Babel的优化(yarn add @babel/plugin-transform-runtime -D)
Babel为编译的每个文件都插入辅助代码，使代码体积过大！
Babel对一些公共方法使用了非常小的辅助代码，比如_extend，默认情况下会被添加到每一个需要它的文件中。
可以将这些辅助代码作为一个独立模块，来避免重复引入。
`@babel/plugin-transform-runtime`禁用Babel自动对每个文件的runtime注入，而是使所有辅助代码从这里引入

## 9. 本地静态图片压缩(可能出现包下载不了的情况)
`yarn add image-minimizer-webpack-plugin imagemin -D`
1. 无损压缩：`yarn add imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D`
2. 有损压缩：`yarn add imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D`

## 10. 代码分割（code split）
打包代码时会将所有js文件打包到一个文件中，体积太大。
我们需要将打包生成的文件进行代码分割，生成多个js文件，渲染哪个页面只加载某个js文件，这样加载资源越少，加载速度就更快。
> 见webpack.codesplit.js
1. 分割文件
2. 按需加载：一上来不加载js文件，需要时再加载js文件，import() 动态导入，见index.js

## 11. preload/prefetch技术
我们前面已经做了代码分割，同时会使用 import 动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）。
但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。
我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 Preload 或 Prefetch 技术。

- Preload：告诉浏览器立即加载资源。
- Prefetch：告诉浏览器在空闲时才开始加载资源。

1. 它们共同点：
都只会加载资源，并不执行。
都有缓存。

2. 它们区别：
Preload加载优先级高，Prefetch加载优先级低。
Preload只能加载当前页面需要使用的资源，Prefetch可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

3. 总结：
当前页面优先级高的资源用 Preload 加载。
下一个页面需要使用的资源用 Prefetch 加载。
它们的问题：兼容性较差。

4. 兼容性比较：
我们可以去 Can I Use 网站查询 API 的兼容性问题。
Preload 相对于 Prefetch 兼容性好一点。

webpack5已经内置，只需要在import依赖时开启即可。
见main.js。
[配置](https://webpack.docschina.org/guides/code-splitting/#prefetchingpreloading-modules)

## 12. network cache
将来开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快。
但是这样的话就会有一个问题, 因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。
所以我们从文件名入手，确保更新前后文件名不一样，这样就可以做缓存了。

- 问题：
当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。
但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

- 原因：
更新前：math.xxx.js, main.js 引用的 math.xxx.js
更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化

- 解决：
配置文件中开启`runtimeChunk: true`
将 hash 值单独保管在一个 runtime 文件中。
我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。
runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。

## 13. core-js (yarn add core-js)
过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用`@babel/preset-env`智能预设来处理兼容性问题。
它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。
所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决。

- 解决：
core-js 是专门用来做 ES6 以及以上 API 的 polyfill。
polyfill翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

- 用法：
1. 直接引入   
在打包入口文件直接引入即可`import 'core-js'`，但是这种写法会将所有的语法打包，会导致包体积很大

2. 按需引入
比如只引入promise，可以直接引入`import 'core-js/es/promise'`即可

3. 自动引入
在`babel.config.js`预设中配置
