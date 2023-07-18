import { sum } from "./js/math.js";

console.log(sum(1, 2, 3, 4));

console.log("index.js");

document.getElementById("btn").addEventListener("click", function () {
  // 按需加载
  import("./js/count.js")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
