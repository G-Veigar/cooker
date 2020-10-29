// key转换函数
function toMapName (origin, target, maps) {
  for (const key in maps) {
    if (key in origin) {
      const newKey = maps[key]
      target[newKey] = origin[key]
    }
  }
}

function styleStringify (selector, style) {
  const styleTextArr = []
  for (const key in style) {
    styleTextArr.push(`${key}: ${style[key]};`)
  }

  return `${selector} {
    ${styleTextArr.join('')}
  }`
}

function createStyleElement (styleText) {
  var style = document.createElement('style')
  style.innerText = styleText
  document.body.appendChild(style)
}

export {
  toMapName,
  styleStringify,
  createStyleElement
}
