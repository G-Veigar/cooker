import leftPanel from './left-panel.vue'

export default {
  name: '组件树',
  install (editor) {
    editor.registerLelfPannel({
      icon: 'icon-node-tree',
      leftPanel
    })
  },
  uninstall (editor) {
  }
}
