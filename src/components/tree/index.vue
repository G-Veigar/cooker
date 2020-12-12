<template>
  <div class="tree">
    <tree-node
      label="page"
      :children="data"
      :isRoot="true"></tree-node>
  </div>
</template>

<script>
import treeNode from './tree-node'
import event from '@/utils/event'

const provideData = {
  currentNodeId: ''
}

export default {
  components: {
    treeNode
  },
  props: {
    data: {
      type: Array || Object
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    childrenKey: {
      type: String,
      default: 'children'
    }
  },
  provide: {
    provideData
  },
  data () {
    return {
      provideData
    }
  },
  methods: {
    handleNodeClick (id) {
      this.provideData.currentNodeId = id
    }
  },
  mounted () {
    event.on('nodeClick', this.handleNodeClick)
  }
}
</script>

<style lang="scss">
</style>
