<template>
  <div class="material-item">
    <div class="help-btn">
      <i class="iconfont icon-help"></i>
    </div>
    <i class="iconfont material-icon" :class="icon"></i>
    <div class="material-name">{{name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { // iconfont
      type: String
    },
    name: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.material-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
  cursor: pointer;
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
    }
    .material-name {
      color: #3490de;
    }
  }
}
</style>
