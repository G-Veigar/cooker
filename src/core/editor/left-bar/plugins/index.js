import codeEditor from './code-editor/index.vue'
import viewTree from './view-tree'
import materialLib from './material-lib'
import apiManager from './api-manager'
import trackManager from './track-manager'
// import actionManager from './action-manager'
import resourceManager from './resource-manager'
import pageManager from './page-manager'

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
    name: '页面管理',
    icon: 'icon-text-pages',
    component: pageManager
  },
  {
    name: '资源管理',
    icon: 'icon-save-to-resource',
    component: resourceManager
  },
  {
    name: '接口管理',
    icon: 'icon-APIjiekouguanli',
    component: apiManager
  },
  {
    name: '埋点管理',
    icon: 'icon-3501shuju',
    component: trackManager
  },
  // {
  //   name: 'action管理',
  //   icon: 'icon-reactjs-fill',
  //   component: actionManager
  // },
  {
    name: '代码编辑器',
    icon: 'icon-code',
    component: codeEditor
  }
]

export default plugins
