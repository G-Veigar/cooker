<template>
  <div class="view-tree">
    <!-- <node-tree :data="treeData" :transverter="treeTransverter"></node-tree> -->
    <tree-node
      :node="schemaData"
      :transverter="treeTransverter"
      :isRoot="true"></tree-node>
  </div>
</template>

<script>
// import nodeTree from '@/components/tree/index.vue'
import treeNode from '@/components/tree/tree-node'
import schema from '@/core/schema'
import { mapState } from 'vuex'
import { materialIconMap } from '../material-lib/materials.js'
import event from '@/utils/event'

const provideData = {
  currentNodeId: ''
}

export default {
  components: { treeNode },
  provide: {
    provideData
  },
  data () {
    return {
      provideData,
      materialIconMap,
      // treeData: schema.nodeTree
      treeData: [
        {
          icon: 'icon-text1',
          label: '文本'
        },
        {
          icon: 'icon-pic',
          label: '图片',
          children: []
        },
        {
          icon: 'icon-attachent',
          label: '链接',
          children: []
        }
      ]
    }
  },
  computed: {
    ...mapState(['schemaData'])
    // materialTree () {
    //   return materialIconMap
    // }
  },
  methods: {
    initHandleSchemaChanged () {
      schema.on('schemaChanged', schemaData => {
        this.treeData = schemaData.nodeTree
      })
    },
    handleNodeClick (id) {
      schema.setCurrentNode(id)
      this.provideData.currentNodeId = id
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
    this.initHandleSchemaChanged()
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
