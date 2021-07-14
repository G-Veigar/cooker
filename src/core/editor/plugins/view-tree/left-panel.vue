<template>
  <div class="view-tree">
    <tree-node
      :node="schemaNodeTree"
      :transverter="treeTransverter"
      :activeId="currentNodeId"
      :isRoot="true"></tree-node>
  </div>
</template>

<script>
import treeNode from '@/components/tree/tree-node'
import schema from '@/core/schema'
import { mapState } from 'vuex'
import { materialIconMap } from '@/core/material'
import event from '@/utils/event'

export default {
  components: { treeNode },
  data () {
    return {
      materialIconMap
    }
  },
  computed: {
    ...mapState({
      schemaNodeTree: state => state.schema.nodeTree,
      currentNodeId: state => state.schema.currentNodeId
    })
  },
  methods: {
    handleNodeClick (nodeId) {
      schema.setCurrentNode(nodeId)
    },
    handleNodeDelete (nodeId) {
      schema.removeNode(nodeId)
    },
    handleNodeCopy (nodeId) {
      const thisNode = schema.getNodeById(nodeId)
      const thisCloneNode = thisNode.cloneNode()
      schema.insertAfter(thisNode, thisCloneNode)
    },
    handleNodeHide (nodeId) {
      const thisNode = schema.getNodeById(nodeId)
      schema.setNodeProp({
        style: {
          display: 'none'
        }
      }, thisNode)
    },
    handleNodeShow (nodeId) {
      schema.undoHelper.undo()
    },
    handleNodeAction (data) {
      const { action, nodeId } = data
      switch (action) {
        case 'delete': this.handleNodeDelete(nodeId); break
        case 'copy': this.handleNodeCopy(nodeId); break
        case 'hide': this.handleNodeHide(nodeId); break
        case 'show': this.handleNodeShow(nodeId); break
      }
    },
    treeTransverter (node) {
      const thisMaterial = materialIconMap[node.tag]
      return {
        name: thisMaterial.name,
        icon: thisMaterial.icon,
        id: node.nodeId
      }
    }
  },
  created () {
  },
  mounted () {
    event.on('nodeClick', this.handleNodeClick)
    event.on('nodeAction', this.handleNodeAction)
  }
}
</script>

<style lang="scss">
.view-tree {
  padding: 10px 6px 0 0;
}
</style>
