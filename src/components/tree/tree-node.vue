<template>
  <div class="tree-node">
    <!-- 垂直线 -->
    <div class="vertical-linner" v-show="showChild"></div>
    <!-- 当前节点 -->
    <div class="current-node" :class="{isRoot}">
      <div class="indent-linner" v-if="!isRoot"></div>
      <div
        class="fold-btn"
        :class="{unfold: showChild}"
        v-if="children"
        @click="toggleShowChild">
        <i class="iconfont icon-triangle-right"></i>
      </div>
      <div>{{label}}</div>
    </div>
    <!-- 子节点wrapper -->
    <div
      v-if="children"
      v-show="showChild"
      class="child-node-wrapper">
      <tree-node
        v-for="item in children"
        :key="item.label"
        :label="item.label"
        :children="item.children"></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-node',
  props: {
    // 是否是根节点
    isRoot: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    children: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      showChild: false
    }
  },
  methods: {
    toggleShowChild () {
      this.showChild = !this.showChild
    }
  }
}
</script>

<style lang="scss">
$indentLinner-width: 10px;
$foldBtn-width: 16px;
$verticalLinner-left: $indentLinner-width + $foldBtn-width / 2;
$childNodeWrapper-paddingLeft: $indentLinner-width + $foldBtn-width / 2;

.tree-node {
  position: relative;
  overflow: hidden;
}

.current-node {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: $indentLinner-width;
}

.current-node.isRoot {
  padding-left: $indentLinner-width;
}

.indent-linner {
  position: absolute;
  left: 0px;
  width: $indentLinner-width;
  height: 1px;
  background-color: #aaa;
}

.vertical-linner {
  position: absolute;
  width: 1px;
  left: $verticalLinner-left;
  height: 100%;
  background-color: #aaa;
  top: 20px;
}

.fold-btn {
  width: $foldBtn-width;
  height: $foldBtn-width;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
}
.fold-btn.unfold {
  transform: rotate(90deg);
}

.icon-triangle-right {
  font-size: 12px;
}

.child-node-wrapper {
  padding-left: $childNodeWrapper-paddingLeft;
}
</style>
