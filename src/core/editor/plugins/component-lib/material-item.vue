<template>
  <div
    class="material-item"
    draggable
    @dragstart="handleDragstart">
    <div class="help-btn">
      <i class="iconfont icon-help"></i>
    </div>
    <i class="iconfont material-icon" :class="material.icon"></i>
    <div class="material-name">{{material.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    material: {
      type: Object
    }
    // dragImg: {
    //   type: [HTMLImageElement, HTMLCanvasElement]
    // }
  },
  methods: {
    handleDragstart (e) {
      // const data = {
      //   name: this.material.name,
      //   tag: this.material.tag
      // }
      const dataStr = JSON.stringify(this.material)
      e.dataTransfer.setData('materialData', dataStr)
      // e.dataTransfer.setDragImage(this.dragImg, 0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
  cursor: move;
  border: 1px solid transparent;
  border-radius: 4px;

  .material-icon {
    width: 30px;
    height: 30px;
    font-size: 30px;
    line-height: 30px;
  }

  .material-name {
    font-size: 12px;
    transition: color 0.3s;
  }

  .help-btn {
    color: #999;
    position: absolute;
    top: -4px;
    right: 0;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    width: 20px;
    visibility: hidden;
    &:hover {
      color: #555;
    }
  }

  &:hover {
    border: 1px dashed #ccc;
    background-color: #ffffff;
    .help-btn {
      visibility: visible;
      cursor: help;
    }
    .material-name {
      color: #3490de;
    }
  }
}
</style>
