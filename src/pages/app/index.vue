<template>
  <cooker-render :schema="schema" :editMode="editMode"></cooker-render>
</template>

<script>
import cookerRender from '@/core/render/vue/index.vue'

const editMode = !(window.location.href.includes('preview'))

export default {
  components: { cookerRender },
  data () {
    return {
      editMode,
      schema: null
    }
  },
  mounted () {
    // 兼容来自编辑器的数据
    window.addEventListener('message', e => {
      const { type, data } = e.data
      if (type === 'schema') {
        this.schema = data
      }
    }, false)
  }
}
</script>

<style>

</style>
