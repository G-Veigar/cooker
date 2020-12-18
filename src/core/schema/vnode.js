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

  // 删除子节点，（不会递归子节点的子节点）
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

  // 新增节点到结尾
  appendChild (node) {
    if (this.children) {
      this.children.push(node)
    } else {
      this.children = [node]
    }
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
