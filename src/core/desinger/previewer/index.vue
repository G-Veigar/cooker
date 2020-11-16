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
    <div class="previewer-main">
      <div class="tools-bar">
        <el-button :type="mode === 'edit' ? 'primary' : ''" @click="selectMode('edit')">编辑</el-button>
        <el-button :type="mode === 'preview'? 'primary' : ''"  @click="selectMode('preview')">预览</el-button>
      </div>
      <div class="viewer" id="viewer-editable" v-show="mode === 'edit'"></div>
      <div class="viewer" id="viewer-readonly" v-show="mode === 'preview'"></div>
    </div>
  </div>
</template>

<script>
import Previewer from './index.js'
import schema from '@/core/schema'

export default {
  data () {
    return {
      mode: 'edit'
    }
  },
  methods: {
    emit (data) {
      this.viewer.emit(data)
    },
    selectMode (type) {
      if (type !== this.mode) {
        if (type === 'preview') {
          this.initPreview()
        }
        this.mode = type
      }
    },
    initPreview () {
      // 只读模式预览器
      this.viewerPre = new Previewer('#viewer-readonly', {
        src: '/app?mode=preview'
      })
      setTimeout(() => {
        this.viewerPre.emit({
          type: 'schema',
          data: schema.nodeTree
        })
      }, 1000)
    }
  },
  mounted () {
    this.viewer = new Previewer('#viewer-editable', {
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

  .previewer-main {
    .tools-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
    }
  }
}

.viewer {
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
