# webpack

1. webpack 默认导入路径必须要带文件后缀。
2. vite 默认导入路径不需要带文件后缀，内部做了处理。
3. webpack 本身只能处理 js、json 文件。

## 1. 处理css
1. style-loader/MiniCssExtractPlugin.loader
2. css-loader

## 2. 处理less yarn add less less-loader -D
1. style-loader/MiniCssExtractPlugin.loader
2. css-loader
3. less-loader
> webpack没有内置less处理，需要下载less预处理器
> vite已经内置了less-loader，只需要下载less即可

## 3. 处理sass｜scss同less

## 4. 处理图片资源
1. webpack4需要file-loader（将图片资源打包成webpack能够认识的资源）和url-loader（再将图片资源进行base64处理）
2. webpack5内置了这两个功能，可以直接原封不动的打包，也可以自定义配置

## 5. 处理esm和cjs
