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
    <left-bar :plugins="pluginList" :current="currentPluginName" @pluginChange="handlePluginChange"></left-bar>
    <div class="tool-wrapper">
      <keep-alive>
        <component v-if="currentPluginComponent" :is="currentPluginComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import toolPlugins from './plugins/index.js'
import leftBar from './left-bar.vue'

export default {
  data () {
    return {
      code: '',
      currentPluginName: '',
      pluginList: null, // 插件列表
      pluginComponentMap: null // 插件名和组件对应的map
    }
  },
  computed: {
    currentPluginComponent () {
      if (this.pluginComponentMap && this.currentPluginName) {
        return this.pluginComponentMap[this.currentPluginName]
      } else {
        return null
      }
    }
  },
  watch: {
    code (val) {
      console.log(val)
    }
  },
  methods: {
    initPlugin () {
      const pluginList = []
      const pluginComponentMap = {}
      toolPlugins.forEach(plugin => {
        pluginList.push({
          name: plugin.name,
          icon: plugin.icon
        })
        pluginComponentMap[plugin.name] = plugin.component
      })
      this.currentPluginName = pluginList[0].name
      this.pluginList = pluginList
      this.pluginComponentMap = pluginComponentMap
    },
    handlePluginChange (name) {
      this.currentPluginName = name
    }
  },
  components: {
    leftBar
  },
  created () {
    this.initPlugin()
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
