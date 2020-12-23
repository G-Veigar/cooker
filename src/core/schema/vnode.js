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
    const childs = this.children
    for (let i = 0; i < childs.length; i++) {
      const currentChild = childs[i]
      if (node === currentChild) {
        childs.splice(i, 1)
        return i
      }
    }
    return -1
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

  insertBefore (node, index) {
    let childs = this.children
    if (!childs) {
      childs = this.children = []
      childs.push(node)
    } else if (index > childs.length) {
      childs.push(node)
    } else {
      childs.splice(index, 0, node)
    }
  }
}

Vnode.cloneNode = function (node) {
  const newNode = cloneDeep(node)
  return newNode
}

export default Vnode
