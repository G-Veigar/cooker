<template>
  <div class="position-setter">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cities: [{
        value: 'static',
        label: '静态定位（默认）'
      }, {
        value: 'relative',
        label: '相对定位'
      }, {
        value: 'absolute',
        label: '绝对定位'
      }, {
        value: 'fix',
        label: '固定定位'
      }, {
        value: 'sticky',
        label: '粘性定位'
      }],
      value: ''
    }
  }
}
</script>

<style>
.position-setter {

}
</style>
