import uid from '@/utils/uid'
import Vue from 'vue'

class SchemaNode {
  constructor (options) {
    const { props, parent, tag, nodeId, text, style, event } = options
    this.nodeId = nodeId || uid() // 节点唯一标识
    this.tag = tag
    this.text = text
    this.style = style
    this.props = props
    this.event = event || { on: {}, emit: {} }
    this.parent = parent || null // 父节点

    // 递归初始化子节点
    if (options.children) {
      this.children = options.children.map(childItem => {
        return new SchemaNode({
          ...childItem,
          parent: this
        })
      })
    }
  }

  // 获取到子节点的index位置
  getChildIndex (childNode) {
    if (this.children) {
      return this.children.indexOf(childNode)
    } else {
      return -1
    }
  }

  // 复制节点
  cloneNode () {
    const newNode = new SchemaNode(this)
    newNode.nodeId = uid()
    newNode.parent = null
    return newNode
  }

  // 删除子节点，（不会递归子节点的子节点）
  removeChild (childNode) {
    const childs = this.children
    for (let i = 0; i < childs.length; i++) {
      const currentChild = childs[i]
      if (childNode === currentChild) {
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

  // 在指定位置前插入子节点
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
    node.parent = this
  }

  // 在指定位置后插入子节点
  insertAfter (node, index) {
    this.insertBefore(node, ++index)
  }

  // 新增事件触发
  addEventEmitter (eventType) {
    const eventName = `#${this.nodeId}@${eventType}`
    this.event.emit[eventType] = eventName
  }
}

export default SchemaNode
