import { createLinear } from './linear';

/**
 * 时间比例尺子
 * 借助线性比例尺
 * 转换成getTime
 */
export function createTime({ domain, ...rest }) {
  const transform = (x) => x.getTime();
  const transformedDomain = domain.map(transform);
  const linear = createLinear({ domain: transformedDomain, ...rest });
  const scale = (x) => linear(transform(x));

  scale.nice = (tickCount) => linear.nice(tickCount);
  scale.ticks = (tickCount) => linear.ticks(tickCount).map((d) => new Date(d));

  return scale;
}
