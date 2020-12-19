<template>
  <div id="desinger">
    <co-toolbar></co-toolbar>
    <co-previewer
      ref="previewer"
      @currentElChange="handleCurrentElChange"
      @dropedNode="handleDropedNode"></co-previewer>
    <co-editor></co-editor>
    <!-- <drag-img></drag-img> -->
  </div>
</template>

<script>
import coToolbar from '@/core/desinger/toolbar/index.vue'
import coEditor from '@/core/desinger/editor/index.vue'
import coPreviewer from '@/core/desinger/previewer/index.vue'
// import dragImg from '@/components/drag-img/index.vue'
import schema from '@/core/schema'
import { mapState } from 'vuex'

export default {
  components: {
    coToolbar,
    coEditor,
    coPreviewer
    // dragImg
  },
  computed: {
    ...mapState({
      schemaNodeTree: state => state.schema.nodeTree
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
    }
  },
  methods: {
    handleCurrentElChange (data) {
      schema.setCurrentNode(data.nodeId)
    },
    handleDropedNode (e) {
      const newNode = schema.createNode(e)
      console.log('newNode', newNode, e)
    },
    handleKeyup (e) {
      console.log('handleKeypress', e)
    }
  },
  mounted () {
    // 优化第一次传递schema.nodeTree逻辑，预览器透出ready事件
    setInterval(() => {
      this.$refs.previewer.emit({
        type: 'schema',
        data: schema.nodeTree
      })
    }, 2000)
  }
}
</script>

<style lang="scss">
#desinger {
  height: 100vh;
  display: flex;
  align-items: stretch;
}
</style>
