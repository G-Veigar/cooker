<template>
  <div class="code-editor">
    <code-ide v-model="code" lang="javascript"></code-ide>
  </div>
</template>

<script>
import codeIde from '@/components/ide/index.vue'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      code: ''
    }
  },
  computed: {
    ...mapState({
      schemaNodeTree: state => state.schema.nodeTree
    })
  },
  watch: {
    schemaNodeTree: {
      handler (val) {
        const code = JSON.stringify(val)
        console.log('code', code)
        this.code = JSON.stringify(val)
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    codeIde
  }
}
</script>

<style>

</style>
