import componentLib from './component-lib'
import viewTree from './view-tree'
import actionManager from './action-manager'
import editorService from '../service'

const pluginList = [
  componentLib,
  viewTree,
  actionManager
]

export default function installEditorPlugins () {
  pluginList.forEach(pluginItem => {
    editorService.installPlugin(pluginItem)
  })
}
