<!--
 * @Author: 高歌
 * @Date: 2020-10-09 15:04:14
 * @LastEditTime: 2020-10-10 15:03:17
 * @LastEditors: 高歌
 * @FilePath: /cooker/src/components/text/text-bar.vue
 * @Description:
-->
<template>
  <div class="text-bar">
    <div class="item font-size">
      <size-selector :value="fontSize" @input="handleSizeInput"></size-selector>
    </div>
    <div class="item color-item">
      <color-selector :value="color" @input="handleColorInput"></color-selector>
    </div>
    <div
      class="item"
      :class="{active: bold }"
      style="fontWeight: bold"
      @click="handleClickItem('bold')">B</div>
    <div
      class="item"
      :class="{active: italic }"
      style="fontStyle: italic"
      @click="handleClickItem('italic')">I</div>
    <div
      class="item"
      :class="{active: underline }"
      style="textDecoration: underline"
      @click="handleClickItem('underline')">U</div>
    <div
      class="item"
      :class="{active: through }"
      style="textDecoration: through"
      @click="handleClickItem('through')">S</div>
  </div>
</template>

<script>
import colorSelector from '../color-selector/index.vue'
import sizeSelector from '../size-selector/index.vue'

export default {
  components: {
    colorSelector,
    sizeSelector
  },
  props: {
    node: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      color: '#000',
      fontSize: 16,
      bold: false, // 加粗
      italic: false, // 倾斜
      underline: false, // 下划线
      through: false // 划线
    }
  },
  watch: {
    node (val) {
      val && this.initStyle(val.style)
    }
  },
  methods: {
    handleSizeInput (val) {
      this.fontSize = val
      this.node.style.fontSize = val + 'px'
    },
    handleColorInput (val) {
      this.color = val
      this.node.style.color = val
    },
    initStyle (style) {
      if (!style) return
      if (style.color) {
        this.color = style.color
      }
      if (style.fontSize) {
        this.fontSize = parseInt(style.fontSize)
      }
      if (style.fontWeight === 'bold') {
        this.bold = true
      }
      if (style.fontStyle?.includes('italic')) {
        this.italic = true
      }
      if (style.textDecoration?.includes('underline')) {
        this.underline = true
      }
      if (style.textDecoration?.includes('line-through')) {
        this.underline = true
      }
    },
    handleClickItem (itemType) {
      this[itemType] = !this[itemType]
      switch (itemType) {
        case 'bold': this.handleBold(); break
        case 'italic': this.handleItalic(); break
        case 'underline':
        case 'through': this.computeTextDecoration(); break
      }
    },
    handleBold () {
      if (this.bold) {
        this.node.style.fontWeight = 'bold'
      } else {
        delete this.node.style.fontWeight
      }
    },
    handleItalic () {
      if (this.italic) {
        this.node.style.fontStyle = 'italic'
      } else {
        delete this.node.style.fontStyle
      }
    },
    computeTextDecoration () {
      const arr = []
      if (this.underline || this.through) {
        if (this.underline) {
          arr.push('underline')
        }
        if (this.through) {
          arr.push('line-through')
        }
        this.node.style.textDecoration = arr.join(' ')
      } else {
        delete this.node.style.textDecoration
      }
    }
  }
}
</script>

<style lang="scss">
.text-bar {
  font-size: 18px;
  display: flex;
  align-items: center;

  .item {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;

    &.color-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }

    &.font-size {
      width: auto;
    }

    &.active {
      background: #666;
      color: #fff;
    }
  }
}

.font-color {
  width: 20px;
  height: 20px;
  border: 1px solid #999;
}
</style>
