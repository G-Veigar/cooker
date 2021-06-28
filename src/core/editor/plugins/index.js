import actionManager from './action-manager'

const pluginList = [
  actionManager
]

export default function installEditorPlugins () {
  pluginList.forEach(pluginItem => {
    pluginItem.install()
  })
}
