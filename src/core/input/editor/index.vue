<template>
  <div id="editor">
    <left-bar></left-bar>
    <co-previewer
      ref="previewer"
      @currentElChange="handleCurrentElChange"
      @dropedNode="handleDropedNode"></co-previewer>
    <right-bar></right-bar>
    <!-- <drag-img></drag-img> -->
  </div>
</template>

<script>
import leftBar from '@/core/input/editor/left-bar/index.vue'
import rightBar from '@/core/input/editor/right-bar/index.vue'
import coPreviewer from '@/core/input/editor/previewer/index.vue'
// import dragImg from '@/components/drag-img/index.vue'
import schema from '@/core/schema'
import { mapState } from 'vuex'
import keyboard from '@/utils/keyboard'
import installEditorPlugins from './plugins'

installEditorPlugins()

export default {
  name: 'editor',
  components: {
    leftBar,
    rightBar,
    coPreviewer
    // dragImg
  },
  computed: {
    ...mapState({
      schemaNodeTree: state => state.schema.nodeTree,
      currentNodeId: state => state.schema.currentNodeId
    })
  },
  watch: {
    schemaNodeTree: {
      handler () {
        this.$refs.previewer.emit({
          type: 'schema',
          data: this.schemaNodeTree
        })
      },
      deep: true
    },
    currentNodeId (nodeId) {
      this.$refs.previewer.emit({
        type: 'currentNodeChange',
        data: {
          nodeId
        }
      })
    }
  },
  methods: {
    handleCurrentElChange (data) {
      schema.setCurrentNode(data.nodeId)
    },
    handleDropedNode (e) {
      const newNode = schema.createNode(e)
      schema.appendToCurrentNode(newNode)
    },
    handleKeyup (e) {
      console.log('handleKeypress', e)
    }
  },
  mounted () {
    keyboard.init()
    // 优化第一次传递schema.nodeTree逻辑，预览器透出ready事件
    setTimeout(() => {
      this.$refs.previewer.emit({
        type: 'schema',
        data: schema.nodeTree
      })
    }, 2000)
  }
}
</script>

<style lang="scss">
#editor {
  height: 100vh;
  display: flex;
  align-items: stretch;
}
</style>
