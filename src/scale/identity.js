/**
 * 恒等比例尺
 * 将数据原封不动映射
 */
export function createIdentity() {
  return (x) => x;
}
