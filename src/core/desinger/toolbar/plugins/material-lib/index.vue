<template>
  <div class="material-lib">
    <div class="input-wrapper">
      <el-input
        placeholder="搜索组件"
        suffix-icon="el-icon-search"
        v-model="searchVal" />
    </div>
    <div class="component-wrapper">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础组件" name="base">
          <div class="item-wrapper">
            <material-item class="mt-item" name="容器" icon="icon-integral"></material-item>
            <material-item class="mt-item" name="文本" icon="icon-text1"></material-item>
            <material-item class="mt-item" name="链接" icon="icon-attachent"></material-item>
            <material-item class="mt-item" name="图片" icon="icon-pic"></material-item>
            <material-item class="mt-item" name="按钮" icon="icon-anniu"></material-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="业务组件" name="business">
          <div class="item-wrapper">
            <material-item class="mt-item" name="容器" icon="icon-integral"></material-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import materialItem from './material-item'

export default {
  components: { materialItem },
  data () {
    return {
      searchVal: '',
      activeNames: [
        'base',
        'business'
      ]
    }
  }
}
</script>

<style lang="scss">
.material-lib {
  padding: 0;
  .input-wrapper {
    padding: 8px;
  }
  .el-collapse-item__header {
    height: 30px;
    padding-left: 10px;
    color: #555;
    font-size: 14px;
  }
  .el-collapse-item__content {
    padding: 0;
  }
  .item-wrapper {
    padding: 8px 4px;
    background-color: #F4F4F4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 14px;
  }
}
</style>
