import { cloneDeep } from 'lodash'

class Vnode {
  constructor (options) {
    const { tag, text, nodeId, style = null } = options
    this.nodeId = nodeId
    this.tag = tag
    this.text = text
    this.style = style
    this.mounted = false // 挂载状态
    if (options.children) {
      this.children = options.children.map(childItem => new Vnode(childItem))
    }
  }

  cloneNode () {
    const newNode = cloneDeep(this)
    return newNode
  }

  // 删除节点，只查找一个层级
  removeChild (node) {
    const child = this.children
    for (let i = 0; i < child.length; i++) {
      const currentChild = child[i]
      if (node === currentChild) {
        child.splice(i, 1)
        return true
      }
    }
    return false
  }
}

Vnode.createNode = function (nodeOptions) {
  return Vnode(nodeOptions)
}
Vnode.cloneNode = function (node) {
  const newNode = cloneDeep(node)
  return newNode
}

export default Vnode
