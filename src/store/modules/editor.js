const module = {
  state: () => ({
    plugins: {}
  }),

  mutations: {
    installEditorPlugin (state, plugin) {
      if (!state.plugins[plugin.name]) {
        console.log('installEditorPlugin', plugin)
        state.plugins[plugin.name] = plugin
      }
    }
  }
}

export default module
