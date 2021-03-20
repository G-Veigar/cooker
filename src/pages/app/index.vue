<template>
  <!-- TOOD: dragover回调只在编辑模式添加 -->
  <div>
    <cooker-render
      :schema="schema"
      :currentNodeId="currentNodeId"
      :editMode="editMode"></cooker-render>
    <cooker-modal v-model="modalVisible"></cooker-modal>
  </div>
</template>

<script>
import cookerRender from '@/core/render/vue/index.vue'
import cookerModal from '@/core/material/modal'

const editMode = !(window.location.href.includes('preview'))

export default {
  components: { cookerRender, cookerModal },
  data () {
    return {
      editMode,
      schema: null,
      currentNodeId: '',
      modalVisible: true
    }
  },
  mounted () {
    // 兼容来自编辑器的数据
    window.addEventListener('message', e => {
      const { type, data } = e.data
      if (type === 'schema') {
        this.schema = data
      }
      if (type === 'currentNodeChange') {
        console.log('currentNodeChange', data)
        this.currentNodeId = data.nodeId
      }
    }, false)
  }
}
</script>

<style lang="scss" scoped>
body {
  min-height: 100vh;
}
</style>
