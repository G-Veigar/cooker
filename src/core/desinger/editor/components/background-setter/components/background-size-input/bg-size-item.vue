<template>
  <el-tooltip effect="dark" :content="title" placement="top">
    <div
      class="bg-size-item"
      :class="{active: active}"
      :title="title"
      @click="handleClick">
      <div class="img-demo" :class="type">Bg</div>
      <div class="inner-wrapper"></div>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    type: { // default, cover, contain, stretch, stretch-x
      type: String,
      default: 'default'
    },
    active: {
      type: Boolean
    }
  },
  computed: {
    title () {
      if (this.type === 'stretch') {
        return '100% 100%'
      } else if (this.type === 'stretch-x') {
        return '100%'
      } else {
        return this.type
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
.bg-size-item {
  width: 60px;
  height: 60px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  &.active {
    border: 1px solid #4169E1;
  }

  .img-demo {
    position: absolute;
    background-color: #ddd;
    font-size: 12px;
    text-align: center;
    width: 30px;
    height: 20px;
    line-height: 20px;
    left: 10px;
    top: 10px;
    &.cover {
      top: 19px;
      left: 14px;
      transform: scale(1.95, 2.05);
    }
    &.contain {
      top: 19px;
      left: 15px;
      transform: scale(1.35);
    }
    &.stretch {
      top: 19px;
      left: 14px;
      transform: scale(1.4, 2);
    }
    &.stretch-x {
      top: 12px;
      left: 14px;
      transform: scale(1.4);
    }
  }

  .inner-wrapper {
    position: absolute;
    width: 70%;
    height: 70%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #aaa;
    box-sizing: border-box;
    z-index: 1;
    background-color: transparent;
  }
}
</style>
