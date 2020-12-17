<!--
 * @Author: 高歌
 * @Date: 2020-10-09 13:44:54
 * @LastEditTime: 2020-10-09 15:29:53
 * @LastEditors: 高歌
 * @FilePath: /cooker/src/desinger/editor/index.vue
 * @Description:
-->
<template>
  <div class="editor">
    <el-tabs type="card">
      <el-tab-pane label="样式属性" name="first">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="盒模型" name="1">
            <div class="box-model-wrapper">
              <box-model :node.sync="currentNode"></box-model>
            </div>
          </el-collapse-item>
          <el-collapse-item title="文本" name="2">
            <text-bar :node.sync="currentNode"></text-bar>
          </el-collapse-item>
          <el-collapse-item title="背景" name="3">
            <background-setter :node.sync="currentNode"></background-setter>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="事件" name="second">事件</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import textBar from './components/text/text-bar.vue'
import boxModel from './components/box-model/index.vue'
import backgroundSetter from './components/background-setter/index.vue'
import schema from '@/core/schema'

export default {
  components: {
    textBar,
    boxModel,
    backgroundSetter
  },
  data () {
    return {
      activeNames: ['1'],
      currentNode: schema.currentNode
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.editor {
  width: 360px;
  max-height: 100vh;
  overflow-y: auto;
  border-left: 1px solid #ccc;
}
.box-model-wrapper {
  display: flex;
  justify-content: center;
}
</style>

<style lang="scss">
.editor {
  .el-collapse-item__header {
    height: 30px;
    text-indent: 10px;
    color: #555;
  }

  .el-collapse-item__wrap {
    background-color: #F4F4F4;
  }

  .el-collapse-item__content {
    padding: 10px;
    // display: flex;
  }
}

</style>
