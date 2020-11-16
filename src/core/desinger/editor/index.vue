<!--
 * @Author: 高歌
 * @Date: 2020-10-09 13:44:54
 * @LastEditTime: 2020-10-09 15:29:53
 * @LastEditors: 高歌
 * @FilePath: /cooker/src/desinger/editor/index.vue
 * @Description:
-->
<template>
  <div class="editor">
    <text-bar :node.sync="currentNode"></text-bar>
    <box-model :node.sync="currentNode"></box-model>
    <background-setter :node.sync="currentNode"></background-setter>
  </div>
</template>

<script>
import textBar from './components/text/text-bar.vue'
import boxModel from './components/box-model/index.vue'
import backgroundSetter from './components/background-setter/index.vue'
import schema from '@/core/schema'

export default {
  components: {
    textBar,
    boxModel,
    backgroundSetter
  },
  data () {
    return {
      currentNode: schema.currentNode
    }
  },
  mounted () {
    schema.on('currentNodeChange', () => {
      this.currentNode = schema.currentNode
    })
  }
}
</script>

<style>
.editor {
  width: 360px;
  max-height: 100vh;
  overflow-y: auto;
}
</style>
