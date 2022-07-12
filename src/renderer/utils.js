/**
 * 创建svg元素
 * @param {*} type svg元素类型
 * @returns svg element
 */
export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

/**
 * 将 child 节点挂载到 parent 节点上面
 * @param {*} parent 父节点
 * @param {*} child 子节点
 */
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

/**
 * 驼峰转化成连线命名并设置到element上
 * @param {*} element 待设置的元素
 * @param {*} attributes 包含待设置的属性的对象
 */
export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`);
    element.setAttribute(kebabCaseKey, value);
  }
}
