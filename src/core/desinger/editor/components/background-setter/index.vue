<template>
  <div class="background-setter">
    <div class="input-item">
      <div class="input-label">颜色：</div>
      <color-selector></color-selector>
    </div>
    <div class="input-item">
      <div class="input-label">图片：</div>
      <el-input type="text" placeholder="请输入背景图片URL"></el-input>
    </div>
    <div class="input-item">
      <div class="input-label">大小：</div>
      <background-size-input></background-size-input>
    </div>
    <div class="input-item">
      <div class="input-label">重复显示：</div>
      <background-repeat-input></background-repeat-input>
    </div>
  </div>
</template>

<script>
import colorSelector from '../color-selector/index.vue'
import backgroundSizeInput from './components/background-size-input/index.vue'
import backgroundRepeatInput from './components/background-repeat-input/index.vue'

export default {
  components: {
    colorSelector,
    backgroundSizeInput,
    backgroundRepeatInput
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.background-setter {
  font-size: 12px;
}

.input-item {
  display: flex;
  align-items: center;

  .input-label {
    font-size: 12px;
    width: 80px;
  }
}
</style>
