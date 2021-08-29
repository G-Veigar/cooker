<template>
  <div class="prop-setter">
    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item
        v-for="(prop, index) in materialProps"
        :key="index"
        :label="prop.name">
        <prop-inputer
          :prop="prop"></prop-inputer>
      </el-form-item>
    </el-form>
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
  data () {
    return {
      formLabelAlign: {}
    }
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
