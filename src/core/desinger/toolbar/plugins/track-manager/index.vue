<template>
  <div class="api-manager">
    <el-input
      placeholder="搜索埋点"
      v-model="filterText">
    </el-input>
    <div class="btn-wrapper">
      <el-button type="primary">新增分组</el-button>
      <el-button type="success">新增埋点</el-button>
    </div>
    <!-- 接口tree -->
    <el-tree
      class="filter-tree"
      :data="apiList"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>
  </div>
</template>

<script>
export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  data () {
    return {
      filterText: '',
      apiList: [{
        id: 1,
        label: 'x推c活动',
        children: [{
          id: 4,
          label: '获取活动详情触发'
        }]
      }, {
        id: 2,
        label: '助力活动',
        children: [{
          id: 5,
          label: '获取活动详情触发'
        }, {
          id: 6,
          label: '助力按钮点击'
        }]
      }, {
        id: 3,
        label: '登录触发'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.api-manager {
  .btn-wrapper {
    margin: 8px;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
