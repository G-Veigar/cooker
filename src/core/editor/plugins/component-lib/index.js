import leftPanel from './left-panel.vue'

export default {
  name: '组件库',
  install (editor) {
    editor.registerLelfPannel({
      icon: 'icon-component',
      leftPanel
    })
  },
  uninstall (editor) {
  }
}
