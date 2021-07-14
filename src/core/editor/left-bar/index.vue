<!--
 * @Author: 高歌
 * @Date: 2020-10-09 13:41:50
 * @LastEditTime: 2020-10-09 14:33:01
 * @LastEditors: 高歌
 * @FilePath: /cooker3/src/desinger/toolbar/index.vue
 * @Description:
-->
<template>
  <div class="toolbar">
    <left-bar-nav
      :plugins="pluginList"
      :current="currentPluginName"
      @pluginChange="handlePluginChange"></left-bar-nav>
    <div class="tool-wrapper">
      <keep-alive>
        <component v-if="currentPluginComponent" :is="currentPluginComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import leftBarNav from './left-bar-nav.vue'
import editorService from '@/core/editor/service'
import store from '@/store'

export default {
  components: {
    leftBarNav
  },
  data () {
    return {
      code: '',
      pluginComponentMap: null // 插件名和组件对应的map
    }
  },
  computed: {
    activePlugin () {
      return store.state.editor.activePlugin
    },
    currentPluginName () {
      return this.activePlugin?.name
    },
    currentPluginComponent () {
      return this.activePlugin?.leftPanel
    },
    editorPlugins () {
      return editorService.plugins
    },
    pluginList () {
      const list = []
      for (const pluginName in this.editorPlugins) {
        list.push({
          name: pluginName,
          icon: this.editorPlugins[pluginName].icon
        })
      }
      return list
    }
  },
  watch: {
    code (val) {
      console.log(val)
    }
  },
  methods: {
    handlePluginChange (name) {
      editorService.switchToPlugin(name)
    }
  },
  mounted () {
    editorService.switchToPlugin('组件库')
  }
}
</script>

<style lang="scss">
.toolbar {
  width: 260px;
  display: flex;

  .tool-wrapper {
    width: 100%;
    border-right: 1px solid #ccc;
  }
}
</style>
