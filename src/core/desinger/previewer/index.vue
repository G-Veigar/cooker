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
    <!-- 顶部工具栏 -->
    <div class="header-tools">
      <!-- 放大缩小 -->
      <div class="zoom-tools">
        <div title="放大预览器"><i class="iconfont icon-add-circle"></i></div>
        <div title="缩小预览器"><i class="iconfont icon-minus-circle"></i></div>
        <div class="zoom-value">{{zoomVal}}%</div>
      </div>
      <!-- 模式切换 -->
      <div class="tools-bar">
        <el-button :type="mode === 'edit' ? 'primary' : ''" @click="selectMode('edit')">编辑</el-button>
        <el-button :type="mode === 'preview'? 'primary' : ''"  @click="selectMode('preview')">预览</el-button>
      </div>
      <!-- 右侧功能 -->
      <div class="right-tools">
        <div class="qrcode-preview" title="二维码预览"><i class="iconfont icon-QRcode"></i></div>
      </div>
    </div>
    <!-- main -->
    <div class="previewer-main">
      <div class="viewer" id="viewer-editable" v-show="mode === 'edit'"></div>
      <!-- 移动设备模拟器 -->
      <div class="device device-iphone-x mobile-device" v-show="mode === 'preview'">
        <div class="device-frame">
          <div class="viewer" id="viewer-readonly"></div>
        </div>
        <div class="device-stripe"></div>
        <div class="device-header"></div>
        <div class="device-sensors"></div>
        <div class="device-btns"></div>
        <div class="device-power"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Previewer from './index.js'
import schema from '@/core/schema'
import './style/devices.min.css'

export default {
  data () {
    return {
      mode: 'edit',
      zoomVal: 100
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
.mobile-device {
  transform: scale(0.7);
}

#viewer-readonly {
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 40px;

  iframe {
    border: none;
  }
}

.previewer {
  position: relative;
  max-height: 100%;
  overflow: auto;
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  &::-webkit-scrollbar {
    display:none
  }

  .header-tools {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 36px;
    background-color: #ffffff;
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: center;
    align-items: center;

    .zoom-tools {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 4px;
      left: 4px;
      color: #aaa;

      .iconfont {
        font-size: 26px;
        margin-right: 4px;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
    }

    .right-tools {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      .iconfont {
        font-size: 28px;
        color: #555;
        cursor: pointer;
      }
    }
  }

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
