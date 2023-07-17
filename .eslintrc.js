module.exports = {
  extends: ["eslint:recommended"], // 继承官方推荐规则，官方规则不需要下载
  env: {
    node: true, // 开启node全局变量
    browser: true, // 开启浏览器全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不使用var定义变量
  },
};
