<template>
  <div class="background-size-input">
    <bg-repeat-item
      v-for="item in bgSizeTypes"
      :key="item"
      :type="item"
      :active="item === currentType"
      @select="handleSelect"></bg-repeat-item>
  </div>
</template>

<script>
import bgRepeatItem from './bg-repeat-item.vue'

export default {
  components: {
    bgRepeatItem
  },
  data () {
    return {
      bgSizeTypes: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'],
      currentType: 'repeat'
    }
  },
  methods: {
    handleSelect (type) {
      this.currentType = type
    }
  }
}
</script>

<style>
.background-size-input {
  display: flex;
  justify-content: space-around;
}
</style>
