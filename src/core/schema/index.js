import store from '@/store'
import Vnode from './vnode'
import Vue from 'vue'
import Undo from '@/utils/undo'
class Schema {
  constructor (schemaData) {
    // 初始化nodeTree
    this._initNodeTree(schemaData)
    // 初始化undo/redo工具
    this._initUndoHelper()
    this.setCurrentNode(this.nodeTree)
  }

  get nodeTree () {
    return store.state.schema.nodeTree
  }

  // 打平的nodeId和node节点的map结构
  get nodeMap () {
    return store.getters.nodeMap
  }

  get currentNode () {
    return store.state.schema.currentNode
  }

  get currentNodeId () {
    return store.state.schema.currentNodeId
  }

  // 获取node节点 参数node可以使node对象，也可以使nodeId
  _getNode (node) {
    if (node instanceof Vnode) {
      return node
    } else if (node in this.nodeMap) {
      return this.nodeMap[node]
    } else {
      throw new Error('未找到node节点')
    }
  }

  // 初始化 nodeTree
  _initNodeTree (schemaData) {
    if (schemaData) {
      const nodeTree = new Vnode(schemaData)
      store.commit('initSchema', nodeTree)
    }
  }

  // 初始化undo工具
  _initUndoHelper () {
    this._undoHelper = new Undo()
  }

  // 设置当前节点
  setCurrentNode (node) {
    node = this._getNode(node)
    store.commit('setCurrentNode', node)
  }

  // 创建节点
  createNode (options) {
    const node = new Vnode({
      tag: options.tag,
      text: options.name
    })
    // this.currentNode.appendChild(node)
    return node
  }

  // 删除节点，不传node参数，默认为currentNode
  removeNode (node) {
    node = node ? this._getNode(node) : this.currentNode
    node.parent.removeChild(node)
  }

  // 设置节点样式
  setNodeStyle (style, node) {
    node = node ? this._getNode(node) : this.currentNode
    if (node.style) {
      node.style = {
        ...node.style,
        ...style
      }
    } else {
      Vue.set(node, 'style', {
        ...style
      })
    }
  }

  // appendChild (child, parentNode) {
  //   parentNode = parentNode || this.currentNode
  //   const childNode = new Vnode(child)
  //   if (!parentNode.children) {
  //     parentNode.children = []
  //   }
  //   parentNode.children.push(childNode)
  //   this.emit('schemaChanged', this)
  // }
}

const schema = new Schema({
  tag: 'div',
  type: 'element', // element: 原生标签
  nodeId: '001',
  style: { // 遵循
    // 文本和字体
    // 暂不支持list: font-variant, direction, unicode-bidi
    color: '#333'
    // fontSize: 16,
    // fontFamily: '',
    // fontWeight: '',
    // fontStyle: '', // normal italic oblique
    // letterSpacing: 2,
    // lineHeight: 20
    // textAlign: 'left', // left center right justify,
    // textDecoration: '', // none underline overline line-through blink
    // textIndent: 2,
    // textShadow: '2px 2px #ff0000',
    // textTransform: 'uppercase;', // none capitalize uppercase lowercase
    // textOverflow: 'ellipsis',
    // verticalAlign: '',
    // whiteSpace: 'nowrap',
    // wordSpacing: 10
    // 盒模型
    // width: 120,
    // maxWidth: 200,
    // minWidth: 100,
    // height: 120,
    // maxHeight: 200,
    // minHeight: 100,
    // padding
    // paddingLeft: 0,
    // paddingTop: 0,
    // paddingRight: 0,
    // paddingBottom: 0,
    // margin
    // marginLeft: 0,
    // marginTop: 0,
    // marginRight: 0,
    // marginBottom: 0,
    // border
    // border: '', // TODO: border生成
    // boxShadow: '', // TODO: boxShadow生成
    // background
    // background: '', // TODO: background生成
    // display
    // display: '',
    // position
    // position: '',
    // left: 0,
    // top: 0,
    // right: 0,
    // bottom: 0,
    // zIndex: 1,
    // visibility: 'hidden',
    // overflow: 'hidden',
    // float: 'none',
    // clear: 'both'
  },
  children: [
    {
      tag: 'p',
      text: 'p11111',
      nodeId: '111',
      style: {
        fontWeight: 'bold'
      }
    },
    {
      tag: 'p',
      nodeId: '123',
      text: 'p222',
      style: {
        color: '#369'
      },
      eventHandles: {
        click: {
          once: false,
          decorator: [
            {
              name: 'debounce',
              params: [500]
            }
          ],
          // TAG: schema中函数如何表示？
          handle: {
            params: [],
            body: "alert('hehe')"
          }
        }
      }
    }
  ]
})

export default schema
