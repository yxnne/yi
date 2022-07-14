import { createThreshold } from './threshold';

export function createQuantize({ domain: [d0, d1], range, ...rest }) {
  const n = range.length - 1;
  const step = (d1 - d0) / (n + 1);
  const quantizeDomain = new Array(n).fill(0).map((_, i) => step * (i + 1));
  return createThreshold({ domain: quantizeDomain, range, ...rest });
}

// 因为 range 有3个值，所以 domain 会被分成三等份，
// 并且按照如下的规则映射
// [0, 300577 / 3) -> "white"
// [300577 / 3, 300577 * (2 / 3)) -> "pink"
// [300577 * (2 / 3), 300577) -> "red

// const scale = createQuantize({
//   domain: [0, 300577],
//   range: ["white", "pink", "red"],
// })
