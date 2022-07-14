import {
  normalize, tickStep, nice, floor, ceil, ticks,
} from './utils';

/**
 * 线型比例尺
 */
export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}) {
  const scale = (x) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };

  // 得到刻度的方法
  scale.ticks = (tickCount) => ticks(d0, d1, tickCount);

  // nice 优化起点和终点的值的方法
  scale.nice = (tickCount) => {
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };

  return scale;
}

/**
 * 线型比例尺
 */
// export function createLinear({
//   domain: [d0, d1],
//   range: [r0, r1],
//   interpolate = interpolateNumber,
// }) {
//   return (x) => {
//     const t = normalize(x, d0, d1);
//     // 默认是使用线性的数值插值器
//     // 如果是颜色可以使用颜色插入器
//     return interpolate(t, r0, r1);
//   };
// }

/**
 * 数值插值器
 * @param {*} t 占比
 * @param {*} start 值域start
 * @param {*} stop 值域end
 * @returns 值
 */
export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
  // 这个其实就是 x = start + （ stop - start ） * t
}

// 颜色差值器
export function interolateColor(t, start, stop) {
  const r = interpolateNumber(t, start[0], stop[0]);
  const g = interpolateNumber(t, start[1], stop[1]);
  const b = interpolateNumber(t, start[2], stop[2]);
  return `rgb(${r}, ${g}, ${b})`;
}

// const scale = createLinear({
//   domain: [0, 1],
//   range: [
//     [255, 255, 255], // 白色
//     [0, 255, 255], // 浅蓝色
//   ],
//   interpolate: interolateColor
// });
