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
      code: '{name: "222"}'
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
        console.log('schema changed')
        this.code = JSON.stringify(val)
      },
      deep: true
    }
  },
  components: {
    codeIde
  }
}
</script>

<style>

</style>
