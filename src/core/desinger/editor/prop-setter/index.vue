<template>
  <div class="prop-setter">属性设置器:
    <prop-inputer
      v-for="(prop, index) in materialProps"
      :prop="prop"
      :key="index"></prop-inputer>
  </div>
</template>

<script>
// import schema from '@/core/schema'
import { mapState } from 'vuex'
import { materialPropsMap } from '@/core/material'
import propInputer from './prop-inputer'

export default {
  components: {
    propInputer
  },
  computed: {
    ...mapState({
      currentNode: state => state.schema.currentNode
    }),
    materialProps () {
      const currentTag = this.currentNode.tag
      return materialPropsMap[currentTag]
    }
  }
}
</script>

<style>

</style>
