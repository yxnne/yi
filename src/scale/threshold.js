export function createThreshold({ domain, range }) {
  const n = Math.min(domain.length, range.length - 1);
  return (x) => {
    const index = domain.findIndex((v) => x < v);
    return range[index === -1 ? n : index];
  };
}

// const scale = createThreshold({
//   domain: [10000, 100000], // 1000, 100000 就是两个分割值
//   range: ["white", "pink", "red"],
// })
// [0, 300577] 会被上面的分割值分成三组，然后如下映射：
// [0, 10000) -> "white"
// [10000, 100000) -> "pink"
// [100000, 300577) -> "red"
