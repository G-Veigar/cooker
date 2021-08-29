<template>
  <el-tooltip effect="dark" :content="type" placement="top">
    <div
      class="bg-repeat-item"
      :class="[type, {active: active}]"
      @click="handleClick">
      <div class="bg-demo" v-for="item in itemNum" :key="item"></div>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    type: { // 'repeat', 'repeat-x', 'repeat-y', 'no-repeat'
      type: String,
      default: 'default'
    },
    active: {
      type: Boolean
    }
  },
  computed: {
    itemNum () {
      if (this.type === 'repeat') {
        return 9
      } else if (this.type === 'no-repeat') {
        return 1
      } else {
        return 3
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('select', this.type)
    }
  }
}
</script>

<style lang="scss">
.bg-repeat-item {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 1px solid #aaa;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;

  &.active {
    border: 1px solid #4169E1;
  }

  &.repeat-x {
    align-items: flex-start;
  }

  &.repeat-y {
    flex-direction: column;
    align-items: flex-start;
  }
  &.no-repeat {
    justify-content: start;
    align-items: flex-start;
  }
  .bg-demo {
    width: 8px;
    height: 8px;
    flex: none;
    background-color: #999;
  }
}
</style>
