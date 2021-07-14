import event from '@/utils/event'
import store from '@/store'

const EDITOR_EVENT_SCOPE = 'editor/'

class EditorService {
  // 插件相关
  plugins = store.state.editor.plugins
  activePlugin = store.state.editor.activePlugin

  installPlugin (plugin) {
    this._plugin = plugin
    store.commit('installEditorPlugin', plugin)
    if (plugin.install) {
      plugin.install(this)
    } else {
      throw new Error('plugin error: plugin必须定义install方法')
    }
    this._plugin = null
  }

  uninstallPlugin (plugin) {
    store.commit('uninstallEditorPlugin', plugin)
    if (plugin.uninstall) {
      plugin.uninstall(this)
    }
  }

  registerLelfPannel (options) {
    store.commit('configPlugin', {
      pluginName: this._plugin.name,
      options
    })
  }

  switchToPlugin (pluginName) {
    store.commit('setActivePlugin', this.plugins[pluginName])
  }

  registerHooks (options) {
    for (const hookName in options) {
      const callback = options[hookName]
      this._registerHook(hookName, callback)
    }
  }

  _registerHook (hookName, callback) {
    event.on(EDITOR_EVENT_SCOPE + hookName, callback)
  }
}

const editorService = new EditorService()

export default editorService
