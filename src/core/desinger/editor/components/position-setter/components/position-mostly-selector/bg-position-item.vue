<template>
  <el-tooltip effect="dark" :content="type" :placement="placement">
    <div
      class="bg-position-item"
      :class="[type, {active: active}]"
      @click="handleClick">
      <div class="bg-demo"></div>
    </div>
  </el-tooltip>
</template>

<script>
// 'left-top', 'center-top', 'right-top',
//         'center-left', 'center-center', 'center-right',
//         'bottom-left', 'bottom-center', 'bottom-right'
export default {
  props: {
    type: {
      type: String
    },
    active: {
      type: Boolean
    }
  },
  computed: {
    placement () {
      const map = {
        'left-top': 'left-end',
        'center-top': 'top',
        'right-top': 'right-end',
        'center-left': 'left',
        'center-center': 'top',
        'center-right': 'right',
        'bottom-left': 'left-start',
        'bottom-center': 'bottom',
        'bottom-right': 'right-start'
      }
      return map[this.type]
    }
  },
  methods: {
    handleClick () {
      this.$emit('select', this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-position-item {
  width: 25%;
  height: 25%;
  border: 1px solid #aaa;
  display: flex;
  cursor: pointer;

  &.active {
    border: 1px solid #4169E1;
  }

  &.center-top {
    justify-content: center;
  }
  &.right-top {
    justify-content: flex-end;
  }
  &.center-left {
    align-items: center;
  }
  &.center-center {
    justify-content: center;
    align-items: center;
  }
  &.center-right {
    justify-content: flex-end;
    align-items: center;
  }
  &.bottom-left {
    align-items: flex-end;
  }
  &.bottom-center {
    justify-content: center;
    align-items: flex-end;
  }
  &.bottom-right {
    justify-content: flex-end;
    align-items: flex-end;
  }
  .bg-demo {
    width: 40%;
    height: 40%;
    box-sizing: border-box;
    border: 1px solid #bbb;
    background-color: #ccc;
  }
}
</style>
