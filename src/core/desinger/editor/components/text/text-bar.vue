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
    <div class="item color-item">
      <color-selector v-model="color"></color-selector>
    </div>
    <div class="item" style="fontWeight: bold">B</div>
    <div class="item" style="fontStyle: italic">I</div>
    <div class="item" style="textDecoration: underline">U</div>
    <div class="item" style="textDecoration: line-through">A</div>
  </div>
</template>

<script>
import colorSelector from '../color-selector/index.vue'

export default {
  components: {
    colorSelector
  },
  props: {
    // data: {
    //   require: true,
    //   default: () => {
    //     return {
    //       bold: false,
    //       italic: false,
    //       underline: false,
    //       lineThrough: false,
    //       color: {
    //         hex: '#000'
    //       }
    //     }
    //   }
    // }
  },
  data () {
    return {
      color: '#fff'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.text-bar {
  font-size: 18px;
  display: flex;

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
  }
}

.font-color {
  width: 20px;
  height: 20px;
  border: 1px solid #999;
}
</style>
