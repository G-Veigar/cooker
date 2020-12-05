/*
 * @Author: 高歌
 * @Date: 2020-10-09 14:41:14
 * @LastEditTime: 2020-10-09 14:45:22
 * @LastEditors: 高歌
 * @FilePath: /cooker/src/main.js
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
