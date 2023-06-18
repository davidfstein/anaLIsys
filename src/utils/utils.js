

const zip = (a, b) => Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

export { zip, mean };