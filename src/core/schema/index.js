// import store from '@/store'
import Vnode from './vnode'

class Schema {
  constructor (nodeTree) {
    this.initNodeTree(nodeTree)
    this.currentNodeId = this.nodeTree.nodeId
    this.currentNode = this.nodeTree
    this.handleList = [] // event的回调数组
  }

  // 初始化
  initNodeTree (nodeTree) {
    this.nodeTreeMap = {}
    if (nodeTree) {
      this.nodeTree = nodeTree
      this.initNodeTreeMap(nodeTree)
    }
  }

  initNodeTreeMap (node) {
    const nodeId = node.nodeId
    this.nodeTreeMap[nodeId] = node
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        this.initNodeTreeMap(node.children[i])
      }
    }
  }

  setCurrentNode (nodeId) {
    if (nodeId !== this.currentNodeId) {
      this.currentNodeId = nodeId
      this.currentNode = this.nodeTreeMap[nodeId]
      this.emit('currentNodeChange')
    }
  }

  appendChild (child, parentNode) {
    parentNode = parentNode || this.currentNode
    const childNode = new Vnode(child)
    if (!parentNode.children) {
      parentNode.children = []
    }
    parentNode.children.push(childNode)
  }

  on (eventName, cb) {
    if (!this.handleList[eventName]) {
      this.handleList[eventName] = []
    }
    this.handleList[eventName].push(cb)
  }

  emit (eventName, payload) {
    const cbs = this.handleList[eventName]
    cbs && cbs.forEach(cb => {
      cb(payload)
    })
  }
}

const schema = new Schema({
  tag: 'div',
  type: 'element', // element: 原生标签
  nodeId: '100',
  style: { // 遵循
    // 文本和字体
    // 暂不支持list: font-variant, direction, unicode-bidi
    color: '#aaa',
    fontSize: 16,
    fontFamily: '',
    fontWeight: '',
    fontStyle: '', // normal italic oblique
    letterSpacing: 2,
    lineHeight: 20,
    textAlign: 'left', // left center right justify,
    textDecoration: '', // none underline overline line-through blink
    textIndent: 2,
    textShadow: '2px 2px #ff0000',
    textTransform: 'uppercase;', // none capitalize uppercase lowercase
    textOverflow: 'ellipsis',
    verticalAlign: '',
    whiteSpace: 'nowrap',
    wordSpacing: 10,
    // 盒模型
    width: 120,
    maxWidth: 200,
    minWidth: 100,
    height: 120,
    maxHeight: 200,
    minHeight: 100,
    // padding
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    // margin
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    // border
    border: '', // TODO: border生成
    boxShadow: '', // TODO: boxShadow生成
    // background
    background: '', // TODO: background生成
    // display
    display: '',
    // position
    position: '',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    visibility: 'hidden',
    overflow: 'hidden',
    float: 'none',
    clear: 'both'
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
      handle () {
        console.log('clicked!')
      }
    }
  },
  children: [
    {
      tag: 'p',
      text: 'p111',
      nodeId: '111'
    },
    {
      tag: 'p',
      nodeId: '123',
      text: 'p222'
    }
  ]
})

export default schema
