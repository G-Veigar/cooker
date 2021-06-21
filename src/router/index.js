import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '@/core/editor/index.vue')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import(/* webpackChunkName: "cooker-app" */ '@/pages/app/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '@/pages/test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
