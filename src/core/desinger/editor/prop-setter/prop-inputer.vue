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
      return this.currentNode.props?.[this.prop.propName]
    },
    inputComponent () {
      return componentMap[this.prop.type]
    }
  },
  methods: {
    handleInput (e) {
      schema.setNodeProp({
        [this.prop.propName]: e
      })
      console.log('handleInput', e)
    }
  }
}
</script>

<style>

</style>
