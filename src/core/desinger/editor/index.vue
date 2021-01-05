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
        <style-setter></style-setter>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">
        <prop-setter></prop-setter>
      </el-tab-pane>
      <el-tab-pane label="事件" name="event">
        <event-setter></event-setter>
      </el-tab-pane>
      <el-tab-pane label="数据" name="data">
        <event-setter></event-setter>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import styleSetter from './style-setter'
import propSetter from './prop-setter'
import eventSetter from './event-setter'

export default {
  components: {
    styleSetter,
    propSetter,
    eventSetter
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
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
