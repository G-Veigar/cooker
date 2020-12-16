<template>
  <div class="view-tree">
    <node-tree :data="treeData"></node-tree>
  </div>
</template>

<script>
import nodeTree from '@/components/tree/index.vue'
import schema from '@/core/schema'
import { mapState } from 'vuex'

export default {
  components: { nodeTree },
  data () {
    return {
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
  },
  methods: {
    initHandleSchemaChanged () {
      schema.on('schemaChanged', schemaData => {
        this.treeData = schemaData.nodeTree
      })
    }
  },
  created () {
    this.initHandleSchemaChanged()
  }
}
</script>

<style lang="scss">
.view-tree {
  padding: 10px 6px 0 0;
}
</style>
