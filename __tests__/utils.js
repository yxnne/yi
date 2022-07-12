export function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

// 将 child 节点挂载到 parent 节点上面
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function getAttributes(node, attributes) {
  return attributes.reduce((total, cur) => (
    total[cur] = node.getAttribute(cur), total
  ), {});
}
