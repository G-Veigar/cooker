<template>
  <div class="cooker-app">
    <cooker-render :schema="schema" :editModel="true"></cooker-render>
  </div>
</template>

<script>
import cookerRender from '@/core/render/vue/index.vue'

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
            text: 'app 111',
            style: {
              text: {
                color: '#bbb'
              }
            },
            eventHandles: {
              click: {
                once: false,
                decorator: [
                  {
                    name: 'debounce',
                    params: [500]
                  }
                ],
                // TAG: schema中函数如何表示？
                handle: {
                  params: [],
                  body: "console.log('hehe')"
                }
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
