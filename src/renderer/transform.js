import { applyTransform, createSVGElement, mount } from './utils';

/**
 * 执行变换
 * @param {*} type 变换类型 translate ｜ rotate ｜ scale
 * @param {*} context 上下文
 * @param  {...any} params 其他属性
 */
export function transform(type, context, ...params) {
  // type 是希望的变换种类：scale，translate，rotate 等
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`); // 按照这个格式转换成string type(params1, params2...)
}

/**
 * 平移
 */
export function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}

/**
 * 旋转
 */
export function rotate(context, theta) {
  transform('rotate', context, theta);
}

/**
 * 缩放
 */
export function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}

/**
 * 保存
 * @explain
 * 这个是什么原理呢？
 * 构造了一个新的 g
 * 将新的g挂在老的g上
 * 然后把context的group指向新的g
 * 那么后续添加的元素以及变换都是在这个新的g上
 * 等变换完成后，还有restore，就是把以前的那个g恢复过来
 * so
 * 这样就有达成一个效果就是，每次发生变换
 * 就会产生在根g中产生一个新的g包裹着元素
 */
export function save(context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}

/**
 * 恢复
 */
export function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}
