<!--
 * @Author: 高歌
 * @Date: 2020-10-09 13:50:08
 * @LastEditTime: 2020-10-09 19:37:28
 * @LastEditors: 高歌
 * @FilePath: /cooker/src/desinger/previewer/index.vue
 * @Description:
-->
<template>
  <div class="previewer">
    <div id="viewer"></div>
  </div>
</template>

<script>
import Previewer from './index.js'

export default {
  methods: {
    emit (data) {
      this.viewer.emit(data)
    }
  },
  mounted () {
    this.viewer = new Previewer('#viewer', {
      src: '/app'
    })

    this.viewer.on('currentElChange', data => {
      this.$emit('currentElChange', data)
    })
  }
}
</script>

<style lang="scss">
.previewer {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
}
#viewer {
  background-color: #fff;
  width: 375px;
  height: 600px;

  iframe {
    width: 100%;
    height: 100%;
    border: 1px solid #aaa;
  }
}
</style>
