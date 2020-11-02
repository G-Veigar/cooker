<template>
  <div id="desinger">
    <co-toolbar></co-toolbar>
    <co-previewer
      ref="previewer"
      @currentElChange="handleCurrentElChange"></co-previewer>
    <co-editor></co-editor>
  </div>
</template>

<script>
import coToolbar from '@/core/desinger/toolbar/index.vue'
import coEditor from '@/core/desinger/editor/index.vue'
import coPreviewer from '@/core/desinger/previewer/index.vue'
import schema from '@/core/schema'

export default {
  components: {
    coToolbar,
    coEditor,
    coPreviewer
  },
  methods: {
    handleCurrentElChange (data) {
      schema.setCurrentNode(data.nodeId)
    }
  },
  mounted () {
    setTimeout(() => {
      // console.log('nodeTree', schema.nodeTree)
      this.$refs.previewer.emit({
        type: 'schema',
        data: schema.nodeTree
      })
    }, 3000)

    setTimeout(() => {
      schema.appendChild('div')

      // console.log(schema.nodeTree)

      setTimeout(() => {
        this.$refs.previewer.emit({
          type: 'schema',
          data: schema.nodeTree
        })
      }, 1000)
    }, 6000)
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
