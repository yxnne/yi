import { createSVGElement, applyAttributes, mount } from './utils'

/**
 * 绘制图形
 * @param {*} type 图形类型
 * @param {*} ctx 上下文对象
 * @param {*} attributes 属性
 * @returns 新建元素
 */
export function shape(type, ctx, attributes) {
  const { group } = ctx
  const el = createSVGElement(type)
  applyAttributes(el, attributes) // 设置属性
  mount(group, el)
  return el // return 新建元素
}

/**
 * 绘制线
 * @param {*} context 上下文
 * @param {*} attributes 属性
 * @returns line element
 */
export function line(context, attributes) {
  return shape('line', context, attributes);
}

/**
 * 绘制矩形
 * @param {*} context 上下文
 * @param {*} attributes 属性
 * @returns rect element
 */
export function rect(context, attributes) {
  const {
    width, height, x, y,
  } = attributes;

  // 这里有对负数的处理
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width), // 负数转化成绝对值
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

/**
 * 绘制圆形
 * @param {*} context 上下文
 * @param {*} attributes 属性
 * @returns circle element
 */
export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

/**
 * 绘制文本
 * @param {*} context 上下文
 * @param {*} attributes 属性
 * @returns text element
 */
export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text; // 通过 textContent 设置标签内的内容
  return textElement;
}

/**
 * 路径
 * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
 * path 的属性 d （路径）是一个字符串，拼接起来比较麻烦，通过数组去生成
  // [
  //  ['M', 10, 10],
  //  ['L', 100, 100],
  //  ['L', 100, 10],
  //  ['Z'],
  // ];
  // 上面的二维数组会被转换成如下的字符串
  // 'M 10 10 L 100 100 L 100 10 Z'
 * @param {*} context 上下文
 * @param {*} attributes 属性
 * @returns path
 */
export function path(context, attributes) {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}

/**
 * 圆环
 * 用3个圆模拟圆环
 * 都是透明fill
 * 用stroke模拟外圆、环内填充、内圆
 * @param {*} context 上下文
 * @param {*} attributes 属性
 * @returns 圆环对象
 */
export function ring(context, attributes) {
  // r1 是内圆的半径，r2 是外圆的半径
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
