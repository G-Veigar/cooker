<template>
  <div class="tree-node">
    <!-- 垂直线 -->
    <div class="vertical-linner" v-show="showChild"></div>
    <!-- 当前节点 -->
    <div class="current-node"
      :class="{isRoot}"
      @dragover.prevent="handleDragover"
      @drop.prevent="handleDrop">
      <div class="indent-linner" v-if="!isRoot"></div>
      <div
        class="fold-btn"
        :class="{unfold: showChild}"
        v-if="children && children.length > 0"
        @click="toggleShowChild">
        <i class="iconfont icon-triangle-right"></i>
      </div>
      <div
        class="node-main"
        :class="{active: this.provideData.currentNodeId === label}"
        draggable
        @dragstart="handleDragstart(label, $event)"
        @click="toggleActive(label)">
        <div class="node-label-wrapper">
          <i class="iconfont node-icon" :class="icon" v-if="icon"></i>
          <span class="node-label">{{label}}</span>
        </div>
        <div class="node-btn-wrapper">
          <div class="node-btn-item" @click="nodeAction('hide')" title="隐藏"><i class="iconfont icon-Notvisible"></i></div>
          <div class="node-btn-item" @click="nodeAction('show')" title="显示"><i class="iconfont icon-browse"></i></div>
          <div class="node-btn-item" @click="nodeAction('delete')" title="删除"><i class="iconfont icon-delete"></i></div>
        </div>
      </div>
    </div>
    <!-- 子节点wrapper -->
    <div
      v-if="children"
      v-show="showChild"
      class="child-node-wrapper">
      <tree-node
        v-for="item in children"
        :icon="item.icon"
        :key="item.label"
        :label="item.label"
        :children="item.children"></tree-node>
    </div>
  </div>
</template>

<script>
import event from '@/utils/event'
import { throttle } from 'lodash'

export default {
  name: 'tree-node',
  props: {
    // 是否是根节点
    isRoot: {
      type: Boolean,
      default: false
    },
    icon: { // iconfont
      type: String
    },
    label: {
      type: String
    },
    children: {
      type: Array,
      required: false
    }
  },
  inject: ['provideData'],
  data () {
    return {
      showChild: false
    }
  },
  methods: {
    toggleShowChild () {
      this.showChild = !this.showChild
    },
    nodeAction (action) {
      console.log(action)
    },
    handleDragstart (label, e) {
      e.dataTransfer.setData('label', label)
    },
    handleDragover: throttle(e => {
      const data = {
        clientX: e.clientX,
        clientY: e.clientY,
        layerX: e.layerX,
        layerY: e.layerY,
        movementX: e.movementX,
        movementY: e.movementY,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screeny: e.screenY,
        x: e.x,
        y: e.y
      }
      console.log(data)
    }, 200),
    handleDrop (e) {
      const data = e.dataTransfer.getData('label')
      console.log('handleDrop', data)
    },
    toggleActive (id) {
      event.emit('nodeClick', id)
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

.node-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: auto;
  color: #333;
  border-radius: 4px;
  padding: 0 4px;

  &.active {
    background-color: #bedcfa;
    background-origin: padding-box;
  }
  &:hover {
    .node-btn-wrapper {
      visibility: visible;
    }
    &:not(.active) {
      background: #eee;
    }
  }

  .node-label-wrapper {
    display: flex;
    align-items: center;

    .node-icon {
      margin-right: 2px;
    }

    .node-label {
      font-size: 12px;
    }
  }

  .node-btn-wrapper {
    visibility: hidden;
    display: flex;
    align-items: center;
    .node-btn-item {
      color: #555;
      margin-right: 2px;
      &:hover {
        color: blue;
      }
    }
  }
}

.current-node {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: $indentLinner-width;
  cursor: pointer;
  box-sizing: border-box;

  &.isRoot {
    padding-left: $indentLinner-width;
  }
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
