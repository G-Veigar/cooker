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
      <el-tab-pane label="样式" name="style">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="盒模型" name="盒模型">
            <div class="box-model-wrapper">
              <box-model :node.sync="currentNode"></box-model>
            </div>
          </el-collapse-item>
          <el-collapse-item title="文本" name="文本">
            <text-bar :node="currentNode" @input="handleInput"></text-bar>
          </el-collapse-item>
          <el-collapse-item title="定位" name="定位">
            <position-setter :node.sync="currentNode"></position-setter>
          </el-collapse-item>
          <el-collapse-item title="背景" name="背景">
            <background-setter :node.sync="currentNode"></background-setter>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">属性</el-tab-pane>
      <el-tab-pane label="事件" name="event">事件</el-tab-pane>
      <!-- <el-tab-pane label="代码" name="second">代码</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import textBar from './components/text/text-bar.vue'
import boxModel from './components/box-model/index.vue'
import backgroundSetter from './components/background-setter/index.vue'
import positionSetter from './components/position-setter/index.vue'
import schema from '@/core/schema'
import { mapState } from 'vuex'

export default {
  components: {
    textBar,
    boxModel,
    backgroundSetter,
    positionSetter
  },
  data () {
    return {
      activeNames: ['盒模型', '文本', '定位']
    }
  },
  computed: {
    ...mapState({
      currentNode: state => state.schema.currentNode
    })
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    // 处理样式设置
    handleInput (val) {
      schema.setNodeStyle({
        ...val
      })
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
    overflow: visible;
  }
}

</style>
