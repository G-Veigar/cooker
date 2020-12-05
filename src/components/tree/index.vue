<template>
  <div class="tree">
    <tree-node label="page" :children="tree" isRoot="true"></tree-node>
  </div>
</template>

<script>
import treeNode from './tree-node'

export default {
  components: {
    treeNode
  },
  data () {
    return {
      tree: [
        {
          label: '一级 1',
          icon: '',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
    }
  }
}
</script>

<style>

</style>
