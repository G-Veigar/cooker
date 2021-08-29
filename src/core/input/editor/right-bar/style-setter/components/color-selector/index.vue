<template>
  <div class="color-selector">
    <div
      class="color-box"
      :style="{backgroundColor: value}"
      @click="changeColor"></div>
    <input class="color-input" type="text" :value="value" @input="handleInput"/>
    <div
      class="picker-wrapper"
      tabindex="1"
      @blur="handlePickerBlur"
      ref="pickerWrapper">
        <chrome-picker
        v-if="showColorPicker"
        :value="value"
        @input="handleColorChange"/>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'

export default {
  components: {
    'chrome-picker': Sketch
  },
  props: {
    value: {
      default: '#fff'
    },
    valType: {
      default: 'hex'
    }
  },
  data () {
    return {
      showColorPicker: false,
      loopLock: false
    }
  },
  methods: {
    switchPickerShow (val) {
      // 在一次event loop中后面的修改不作用，解决picker失去焦点，但点击到选择卡上的冲突问题（blur事件和click事件在一个loop中）
      if (this.loopLock) return
      this.showColorPicker = (val !== undefined ? val : !this.showColorPicker)
      this.loopLock = true
      setTimeout(() => {
        this.loopLock = false
      }, 0)
    },
    changeColor () {
      this.switchPickerShow()
      this.$refs.pickerWrapper.focus()
    },
    handleColorChange (e) {
      const val = e[this.valType]
      this.$emit('input', val)
    },
    handleInput (e) {
      console.log('input', e)
    },
    handlePickerBlur () {
      this.switchPickerShow(false)
    }
  }
}
</script>

<style lang="scss">
.color-selector {
  position: relative;
  display: flex;
  align-items: center;
  .color-box {
    width: 16px;
    height: 16px;
    border: 1px solid #999;
  }
  .color-input {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    width: 60px;
    border: 1px solid #ccc;
    outline: none;
  }
  .picker-wrapper {
    z-index: 100;
    position: absolute;
    left: 0;
    top: 100%;
    outline: none;
  }
}
</style>
