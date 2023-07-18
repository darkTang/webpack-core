module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 按需加载引入corejs中需要的包
        corejs: "3", // 版本号
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
