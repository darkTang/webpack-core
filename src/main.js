import count from "./js/count.js";
import sum from "@/js/sum";
import sub from "./ts/index";
import "./css/index.css";
import "./css/iconfont.css";
import "./less/index.less";
import "./sass/index.scss";
// import Vue from "vue";
// import App from './vue2/index.vue'
import { createApp } from "vue";
import App from "./vue3/index.vue";

let a = 2;
console.log(count(a, 3));
console.log(sum(1, 2, 3, 4));
console.log(sub(10, 2));

// vue2配置
// new Vue({
//   render: h => h(App)
// }).$mount('#app')

// vue3配置
createApp(App).mount("#app");
