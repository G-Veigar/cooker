import codeEditor from './code-editor/index.vue'
import viewTree from './view-tree'
import materialLib from './material-lib'

const plugins = [
  {
    name: '物料库', // name唯一
    icon: 'icon-component',
    component: materialLib
  },
  {
    name: '组件树',
    icon: 'icon-node-tree',
    component: viewTree
  },
  {
    name: '代码编辑器',
    icon: 'icon-code',
    component: codeEditor
  }
]

export default plugins
