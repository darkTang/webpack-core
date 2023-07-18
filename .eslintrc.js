module.exports = {
  extends: ["eslint:recommended"], // 继承官方推荐规则，官方规则不需要下载
  env: {
    node: true, // 开启node全局变量
    browser: true, // 开启浏览器全局变量
  },
  // ESLint默认解析器不支持动态导入 import导入会报错
  // 通过ESLint解析器@babel/eslint-parser来解决
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不使用var定义变量
  },
};
