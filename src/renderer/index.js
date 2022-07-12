import { createContext } from './context'
import {
  line, circle, rect, ring, path, text,
} from './shape'
import {
  save, restore, translate, rotate, scale,
} from './transform'

export function createRenderer(width, height) {
  const context = createContext(width, height)

  return {
    line: (options) => line(context, options),
    circle: (options) => circle(context, options),
    text: (options) => text(context, options),
    rect: (options) => rect(context, options),
    path: (options) => path(context, options),
    ring: (options) => ring(context, options), // 绘制圆环
    node: () => context.node,
    group: () => context.group,
    save: () => save(context),
    restore: () => restore(context),
    translate: (...params) => translate(context, ...params),
    rotate: (...params) => rotate(context, ...params),
    scale: (...params) => scale(context, ...params),
  }
}
