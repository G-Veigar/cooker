import leftPanel from './left-panel.vue'

export default {
  name: 'action管理', // name唯一
  install (editor) {
    editor.registerLelfPannel({
      icon: 'icon-text-pages',
      leftPanel
    })
    editor.registerHooks({
      beforeElementAdded (element) {
        console.log('hooks: beforeElementAdded')
      },
      elementAdded (element) {
        console.log('hooks: elementAdded')
      },
      beforeElementRemoved (element) {
        console.log('hooks: beforeElementRemoved')
      },
      elementRemoved (element) {
        console.log('hooks: elementRemoved')
      },
      beforeElementStateChanged (element) {
        console.log('hooks: beforeElementStateChanged')
      },
      elementStateChanged (element) {
        console.log('element: elementStateChanged')
      }
    })
  },
  uninstall (editor) {
  }
}
