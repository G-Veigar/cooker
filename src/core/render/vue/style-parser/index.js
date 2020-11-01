import textStyleParser from './text'
import { styleStringify, createStyleElement } from './utils'

// 根据styleSchema生成 style样式内容对象
function styleParser (styleSchema, parentCssStyle) {
  if (styleSchema.text) {
    const textStyle = textStyleParser(styleSchema.text)
    return { ...parentCssStyle, ...textStyle }
  }
}

function styleCreater (schemaNode) {
  if (!schemaNode.style) return
  const nodeIdAttr = `#node-${schemaNode.nodeId}`
  const cssStyle = styleParser(schemaNode.style)
  const styleText = styleStringify(nodeIdAttr, cssStyle)
  createStyleElement(styleText)
}

export { styleCreater, styleParser }
