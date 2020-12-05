<template>
  <div class="ide-container" ref="ide"></div>
</template>

<script>
import * as monaco from 'monaco-editor'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: 'javascript'
    }
  },
  mounted () {
    this.ide = monaco.editor.create(this.$refs.ide, {
      value: this.value,
      readOnly: false,
      language: this.lang
      // theme: 'vs-dark'
    })
    this.ide.onDidChangeModelContent(event => {
      const codeStr = this.ide.getValue()
      this.$emit('input', codeStr)
    })
  }
}
</script>

<style>
.ide-container {
  width: 200px;
  height: 400px;
}
</style>
