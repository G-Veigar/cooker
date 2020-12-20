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
        v-if="node.children && node.children.length > 0"
        @click="toggleShowChild">
        <i class="iconfont icon-triangle-right"></i>
      </div>
      <div
        class="node-main"
        :class="{active: this.activeId === nodeData.id}"
        draggable
        @dragstart="handleDragstart(nodeData.name, $event)"
        @click="toggleActive(nodeData.id)">
        <div class="node-label-wrapper">
          <i class="iconfont node-icon" :class="nodeData.icon" v-if="nodeData.icon"></i>
          <span class="node-label">{{nodeData.name}}</span>
        </div>
        <div class="node-btn-wrapper">
          <div class="node-btn-item" @click.stop="nodeAction('hide')" title="隐藏"><i class="iconfont icon-Notvisible"></i></div>
          <div class="node-btn-item" @click.stop="nodeAction('show')" title="显示"><i class="iconfont icon-browse"></i></div>
          <div class="node-btn-item" @click.stop="nodeAction('delete')" title="删除"><i class="iconfont icon-delete"></i></div>
        </div>
      </div>
    </div>
    <!-- 子节点wrapper -->
    <div
      v-if="node.children"
      v-show="showChild"
      class="child-node-wrapper">
      <tree-node
        v-for="item in node.children"
        :transverter="transverter"
        :activeId="activeId"
        :key="item.label"
        :node="item"></tree-node>
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
    node: { // 节点数据
      type: Object,
      required: true
    },
    name: { // 节点名
      type: String,
      required: false
    },
    icon: { // 节点icon
      type: String, // iconfont名
      required: false
    },
    id: { // 节点id
      type: String,
      required: false
    },
    activeId: { // 当前节点id
      type: String,
      required: false
    },
    transverter: { // 转换函数，应用在节点上，返回包含节点label，和icon的对象
      type: Function,
      required: false
    }
  },
  data () {
    return {
      showChild: false
    }
  },
  computed: {
    nodeData () {
      if (this.name && this.icon && this.id) {
        return {
          name: this.name,
          icon: this.icon,
          id: this.id
        }
      } else if (this.transverter) {
        return this.transverter(this.node)
      } else {
        return {}
      }
    }
  },
  methods: {
    toggleShowChild () {
      this.showChild = !this.showChild
    },
    nodeAction (action) {
      event.emit('nodeAction', {
        action,
        nodeId: this.node.nodeId
      })
    },
    handleDragstart (label, e) {
      const data = { label }
      const dataStr = JSON.stringify(data)
      e.dataTransfer.setData('materialData', dataStr)
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
      const data = e.dataTransfer.getData('materialData')
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
