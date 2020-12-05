<template>
  <div class="left-bar">
    <div
      class="plugin-item"
      :title="item.name"
      :class="{active: current===item.name}"
      v-for="item in plugins"
      :key="item.label"
      @click="changePlugin(item)">
      <i class="iconfont plugin-icon" :class="item.icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plugins: {
      type: Array
    },
    current: {
      type: String
    }
  },
  methods: {
    changePlugin (item) {
      this.$emit('pluginChange', item.name)
    }
  }
}
</script>

<style lang="scss" scoped>
$leftBar-wdith: 46px;

.left-bar {
  width: $leftBar-wdith;
  height: 100%;
  background-color: #EAEDF0;
  flex: none;
  border-right: 1px solid #ccc;
}

.plugin-item {
  cursor: pointer;
  width: $leftBar-wdith;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background: #ccc;
  }
  .plugin-icon {
    font-size: 18px;
    color: #666;
  }
}
</style>
