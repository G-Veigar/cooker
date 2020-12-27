<template>
  <component
    :is="inputComponent"
    :value="value"
    @input="handleInput"></component>
</template>

<script>
import { Input } from 'element-ui'
import { mapState } from 'vuex'
import schema from '@/core/schema'
import { getValByPath, setValByPath } from '@/utils'

const componentMap = {
  text: Input
}

export default {
  props: {
    prop: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      currentNode: state => state.schema.currentNode
    }),
    value () {
      return getValByPath(this.currentNode, this.prop.propName)
    },
    inputComponent () {
      return componentMap[this.prop.type]
    }
  },
  methods: {
    handleInput (e) {
      const newData = {}
      setValByPath(newData, this.prop.propName, e)
      console.log('newData', newData)
      schema.setNodeProp(newData)
    }
  }
}
</script>

<style>

</style>
