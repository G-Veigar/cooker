<template>
  <div id="desinger">
    <co-toolbar></co-toolbar>
    <co-previewer
      ref="previewer"
      @currentElChange="handleCurrentElChange"
      @dropedNode="handleDropedNode"></co-previewer>
    <co-editor></co-editor>
    <drag-img></drag-img>
  </div>
</template>

<script>
import coToolbar from '@/core/desinger/toolbar/index.vue'
import coEditor from '@/core/desinger/editor/index.vue'
import coPreviewer from '@/core/desinger/previewer/index.vue'
import dragImg from '@/components/drag-img/index.vue'
import schema from '@/core/schema'

export default {
  components: {
    coToolbar,
    coEditor,
    coPreviewer,
    dragImg
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
    setInterval(() => {
      // console.log('nodeTree', schema.nodeTree)
      this.$refs.previewer.emit({
        type: 'schema',
        data: schema.nodeTree
      })
    }, 2000)

    // setTimeout(() => {
    //   schema.appendChild('div')
    // }, 2000)
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
