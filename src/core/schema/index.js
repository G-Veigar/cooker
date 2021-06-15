import store from '@/store'
import Vnode from './vnode'
import Vue from 'vue'
import Undo from '@/utils/undo'

class Schema {
  constructor (schemaData) {
    // 初始化nodeTree
    this._initNodeTree(schemaData)
    this.setCurrentNode(this.nodeTree)
    this.state = schemaData.state
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

  _appendNode (fatherNode, childNode) {
    fatherNode = this._getNode(fatherNode)
    childNode = this._getNode(childNode)
    fatherNode.appendChild(childNode)
  }

  _$undoAppendNode (operationRecord) {
    const { params: [fatherNode, childNode] } = operationRecord
    fatherNode.removeChild(childNode)
  }

  _removeNodeFrom (fatherNode, childNode) {
    fatherNode = this._getNode(fatherNode)
    childNode = this._getNode(childNode)
    return fatherNode.removeChild(childNode) // 返回删除node在父节点的位置
  }

  _$undoRemoveNodeFrom (operationRecord) {
    const { params: [fatherNode, childNode], res } = operationRecord
    fatherNode.insertBefore(childNode, res)
  }

  // 设置节点属性
  _setNodeProp (props, node) {
    node = node ? this._getNode(node) : this.currentNode
    const changeMap = {}
    for (const key in props) {
      const oldVal = node[key]
      const newVal = props[key]
      changeMap[key] = oldVal
      Vue.set(node, key, newVal)
    }
    return {
      changeNode: node,
      changeMap
    }
  }

  _$undoSetNodeProp (operationRecord) {
    const { res: { changeNode, changeMap } } = operationRecord
    this._setNodeProp(changeMap, changeNode)
  }

  getNodeById (nodeId) {
    if (nodeId in this.nodeMap) {
      return this.nodeMap[nodeId]
    }
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

  // 在当前节点后面追加节点
  appendToCurrentNode (node) {
    this.appendNode(this.currentNode, node)
  }

  removeNode (node) {
    node = this._getNode(node)
    this.removeNodeFrom(node.parent, node)
  }

  // 删除当前节点
  removeCurrentNode () {
    const fatherNode = this.currentNode.parent
    this.removeNodeFrom(fatherNode, this.currentNode)
  }

  // 插入节点
  _insertAfter (node, newNode) {
    const index = node.parent.getChildIndex(node)
    node.parent.insertAfter(newNode, index)
    return index
  }

  _$undoInsertAfter (operationRecord) {
    const { params: [node, newNode] } = operationRecord
    node.parent.removeChild(newNode)
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

  // 设置全局状态值
  setRootState (key, value) {

  }
}

initUndoMethods()

function initUndoMethods () {
  // 初始化undoHelper
  const undoHelper = new Undo()
  window.undo = undoHelper
  Schema.prototype.undoHelper = undoHelper

  // 原型增加appendNode与removeNode可逆的undo操作
  const {
    _appendNode, _$undoAppendNode,
    _removeNodeFrom, _$undoRemoveNodeFrom,
    _insertAfter, _$undoInsertAfter,
    _setNodeProp, _$undoSetNodeProp
  } = Schema.prototype

  const appendNodeHelper = undoHelper.add({
    redo: _appendNode,
    undo: _$undoAppendNode
  })
  const removeNodeFromHelper = undoHelper.add({
    redo: _removeNodeFrom,
    undo: _$undoRemoveNodeFrom
  })
  const insertAfterHelper = undoHelper.add({
    redo: _insertAfter,
    undo: _$undoInsertAfter
  })
  const setNodePropHelper = undoHelper.add({
    redo: _setNodeProp,
    undo: _$undoSetNodeProp
  })
  Schema.prototype.appendNode = appendNodeHelper
  Schema.prototype.removeNodeFrom = removeNodeFromHelper
  Schema.prototype.insertAfter = insertAfterHelper
  Schema.prototype.setNodeProp = setNodePropHelper
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
        fontWeight: 'bold',
        marginTop: '100px'
      },
      event: {
        on: {},
        emit: {
          click: '#mybtn@click'
        }
      }
    },
    {
      tag: 'p',
      nodeId: '123',
      text: 'p222',
      style: {
        color: '#369'
      },
      event: {
        emit: {},
        on: {
          '#123@click': {
            type: 'base',
            name: 'hide',
            params: {
              nodeId: '123'
            }
          },
          '#mybtn@click': {
            type: 'base',
            name: 'hide',
            params: {
              nodeId: '123'
            }
            // params: {
            //   url: 'http://www.baidu.com'
            // }
            // app
            //   .setData()
            //   .hide()
            //   .show()
            //   .showToast()
            //   .showLoading()
            //   .closeToast()
            //   .navTo()
            //   .routerPush()
            //   .routerReplace()
            //   .routerBack()
            //   .requestApi()
            //   .track()
          }
        }
      }
    },
    {
      tag: 'img',
      nodeId: 'img000',
      style: {
        fontWeight: 'bold'
      },
      props: {
        src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2203133702,1040096964&fm=26&gp=0.jpg'
      }
    }
  ],
  state: {
    '123Show': true
  }
})

export default schema
