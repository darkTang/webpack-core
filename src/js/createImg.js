import path from 'path'
// export default function() {
const img = document.createElement("img");
img.src = path.resolve(__dirname, "../images/bg3.jpg");
document.body.appendChild(img);
// }
