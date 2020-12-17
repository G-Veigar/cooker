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
import { materialIconMap } from '../material-lib/materials.js'
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
    handleNodeClick (id) {
      schema.setCurrentNode(id)
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
  }
}
</script>

<style lang="scss">
.view-tree {
  padding: 10px 6px 0 0;
}
</style>
