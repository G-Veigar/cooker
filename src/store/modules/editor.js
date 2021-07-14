// import Vue from 'vue'

const module = {
  state: () => ({
    plugins: {},
    activePlugin: {}
  }),

  mutations: {
    installEditorPlugin (state, plugin) {
      if (!state.plugins[plugin.name]) {
        state.plugins[plugin.name] = {
          name: plugin.name,
          icon: '',
          leftPanel: null
        }
      }
    },
    configPlugin (state, { pluginName, options }) {
      state.plugins[pluginName] = {
        ...state.plugins[pluginName],
        ...options
      }
    },
    setActivePlugin (state, plugin) {
      // Vue.set(state, 'activePlugin', plugin)
      state.activePlugin = plugin
    }
  }
}

export default module
