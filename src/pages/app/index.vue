<template>
  <div class="cooker-app">
    <cooker-render :schema="schema"></cooker-render>
  </div>
</template>

<script>
import cookerRender from '@/core/render/index.vue'

export default {
  components: { cookerRender },
  data () {
    return {
      schema: {
        tag: 'div',
        style: {
          text: {
            color: '#aaa'
          }
        },
        children: [
          {
            tag: 'h1',
            text: 'app',
            style: {
              text: {
                color: '#bbb'
              }
            }
          }, {
            tag: 'p',
            children: [
              {
                tag: 'span',
                text: 'aaaaa'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
