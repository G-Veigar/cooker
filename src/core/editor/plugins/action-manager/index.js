import lelfPannel from './left-pannel.vue'

export default {
  name: '物料库',
  install (editor) {
    editor.registerLelfPannel({
      name: '物料库', // name唯一
      icon: 'icon-component',
      component: lelfPannel
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
