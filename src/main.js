// import count from "./js/count.js";
import sum from "@/js/sum";
import sub from "./ts/index";
import "./css/index.css";
import "./css/iconfont.css";
import "./less/index.less";
import "./sass/index.scss";
// import "core-js";
// import Vue from "vue";
// import App from './vue2/index.vue'
import { createApp } from "vue";
import App from "./vue3/index.vue";

// let a = 2;
// console.log(count(a, 3));
console.log(sum(1, 2, 3, 4));
console.log(sub(10, 2));

// vue2配置
// new Vue({
//   render: h => h(App)
// }).$mount('#app')

// vue3配置
createApp(App).mount("#app");

// 判断是否支持热模替换，实际开发中，vue和react已经帮我们做了处理
if (module.hot) {
  module.hot.accept("./js/count.js");
  // 第二个参数传入一个函数，当文件发生变化时，调用函数
  // module.hot.accept("./js/count.js", function(...args) {
  //   console.log(args);
  // });

  // 可以传一个数组，当其中任何一个依赖更新时，都会调用
  // module.hot.accept(['./content.js', './math.js'], (...args) => {
  //   console.log(args);
  // })
}

document.getElementById("btn").addEventListener("click", function () {
  // 按需加载
  // /* webpackChunkName: "count" */ webpack魔法命名，传递给chunkFilename
  // 开启webpackPreload
  /* webpackPreload: true */
  // 开启webpackPrefetch
  /* webpackPrefetch: true */
  import(
    /* webpackChunkName: "count" */
    /* webpackPreload: true */
    "./js/count.js"
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
