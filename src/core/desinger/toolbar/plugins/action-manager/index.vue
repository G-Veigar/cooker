<template>
  <div class="action-manager">
    <div class="base-action">
      <div>基础action</div>
      <div v-for="item in baseActions" :key="item.actionName">{{item.actionName}}</div>
    </div>
    <div class="custom-action">
      <div>自定义action</div>
      <div v-for="item in customAction" :key="item.actionName">{{item.actionName}}</div>
    </div>
  </div>
</template>

<script>
import baseAction from '@/core/action/base.js'

export default {
  data () {
    return {
      customAction: []
    }
  },
  computed: {
    baseActions () {
      const list = []
      if (baseAction) {
        for (const action in baseAction) {
          list.push({
            actionName: action
          })
        }
      }
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.action-manager {
}
</style>
