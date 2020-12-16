import Vue from 'vue'
import Vuex from 'vuex'
import schema from '@/core/schema'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schemaData: schema.nodeTree,
    currentNodeId: '' // active的node的id
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
