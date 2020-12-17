const initNodeTreeMap = (node, nodeMap) => {
  const nodeId = node.nodeId
  nodeMap[nodeId] = node
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      initNodeTreeMap(node.children[i], nodeMap)
    }
  }
}

const module = {
  state: () => ({
    nodeTree: null,
    currentNodeId: '',
    currentNode: null
  }),

  mutations: {
    initSchema (state, schemaData) {
      state.nodeTree = schemaData
    },
    setCurrentNode (state, node) {
      state.currentNode = node
      state.currentNodeId = node.nodeId
    }
  },

  getters: {
    nodeMap (state) {
      const nodeMap = {}
      const node = state.nodeTree
      initNodeTreeMap(node, nodeMap)
      return nodeMap
    }
  }
}

export default module
