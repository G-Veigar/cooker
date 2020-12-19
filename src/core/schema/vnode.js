import { cloneDeep } from 'lodash'
import uid from '@/utils/uid'
import Vue from 'vue'

class Vnode {
  constructor (options) {
    const { parent, tag, nodeId, text, style = null } = options
    this.nodeId = nodeId || uid() // 节点id
    this.tag = tag
    this.text = text
    this.style = style
    this.parent = parent || null // 父节点

    if (options.children) {
      this.children = options.children.map(childItem => {
        return new Vnode({
          ...childItem,
          parent: this
        })
      })
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
      Vue.set(this, 'children', [node])
    }
    node.parent = this // 父子关系绑定
  }
}

Vnode.cloneNode = function (node) {
  const newNode = cloneDeep(node)
  return newNode
}

export default Vnode
