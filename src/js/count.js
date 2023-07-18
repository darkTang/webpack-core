export default function (...args) {
  console.log(123);
  return args.reduce((prev, cur) => prev + cur);
}
