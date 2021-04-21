import { parseEventHandle } from './event-parser/index.js'
/**
 * 将schema数据转为createElement的参数
 *
 * @param {*} schema
 * @param {*} createElement
 * @returns vue的createElement函数的三个参数 element，attribute，children
 */
function schema2RenderParmas ($this, schema, createElement, componentMap) {
  if (!schema) {
    return {
      element: 'div',
      attribute: null,
      children: null
    }
  }
  // 处理显隐逻辑
  const nodeShowKey = schema.nodeId + 'Show'
  if ($this.stateData[nodeShowKey] === false) {
    return {
      element: 'div',
      attribute: null,
      children: null
    }
  }
  let res
  // 处理自定义组件
  if (schema.tag.startsWith('$')) {
    res = {
      element: componentMap[schema.tag],
      attribute: {
        props: {
        }
      },
      children: []
    }
  } else {
  // 处理原生dom
    res = {
      element: schema.tag,
      attribute: {
        attrs: {
          id: schema.nodeId
        },
        class: {
          root: true
        }
      },
      children: []
    }
    // 处理 style
    if (schema.style) {
      res.attribute.style = schema.style
    }
    // 处理 props
    if (schema.props) {
      res.attribute.domProps = schema.props
    }
    // 处理 attrs
    if (schema.attrs) {
      res.attribute.attrs = schema.attrs
    }

    // 处理 eventHandles
    if (schema.event) {
      const handles = parseEventHandle($this, schema)
      res.attribute.on = handles.on
    }
    if (schema.text) {
      res.attribute.domProps = {
        innerText: schema.text
      }
    }
    let children = []
    if (schema.children) {
      children = schema.children.map(item => {
        const { element, attribute, children } = schema2RenderParmas($this, item, createElement, componentMap)
        return createElement(element, attribute, children)
      })
    }
    res.children = children
  }
  return res
}

function schemaParamsInjector (paramData, schema) {
  const nodeId = schema.nodeId
  if (nodeId in paramData) {
    const thisParam = paramData[nodeId]
    setValByPath(schema, thisParam.propPath, thisParam.value)
  }
  if (schema.children) {
    for (let i = 0; i < schema.children.length; i++) {
      schemaParamsInjector(paramData, schema.children[i])
    }
  }
}

function setValByPath (obj, path, val) {
  const pathArr = path.split('.')
  const lastKey = pathArr[pathArr.length - 1]
  for (let i = 0; i < pathArr.length - 1; i++) {
    obj = obj[pathArr[i]]
  }
  obj[lastKey] = val
}

export {
  schema2RenderParmas,
  schemaParamsInjector
}
