export default function (...args) {
  return args.reduce((prev, cur) => prev + cur);
}
