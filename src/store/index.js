import Vue from 'vue'
import Vuex from 'vuex'
// import schema from '@/core/schema'
import schemaModule from '@/core/schema/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    schema: schemaModule
  }
})
