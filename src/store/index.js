import Vue from 'vue'
import Vuex from 'vuex'
import schemaModule from '@/core/schema/store'
import editorModule from './modules/editor'

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
    schema: schemaModule,
    editor: editorModule
  }
})
