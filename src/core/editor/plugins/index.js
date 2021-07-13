import actionManager from './action-manager'
import editorService from '../service'

const pluginList = [
  actionManager
]

export default function installEditorPlugins () {
  pluginList.forEach(pluginItem => {
    editorService.installPlugin(pluginItem)
  })
}
