import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schemaNodeMap: {
      100: {
        tag: 'div'
      },
      111: {
        tag: 'p',
        text: 'p111'
      },
      123: {
        tag: 'p',
        text: 'p222'
      }
    },
    currentNodeId: ''
  },
  getters: {
    currentNode (state) {
      return state.schemaNodeMap[state.currentNodeId]
    }
  },
  mutations: {
    setCurrentNodeId (state, id) {
      state.currentNodeId = id
    },
    addSchemaNodeMap (state, data) {
      state.schemaNodeMap[data.nodeId] = data
    },
    removeSchemaNodeMap (state, nodeId) {
      delete state.schemaNodeMap[nodeId]
    }
  },
  actions: {
  },
  modules: {
  }
})
