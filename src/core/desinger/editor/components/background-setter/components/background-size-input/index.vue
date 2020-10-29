<template>
  <div class="background-size-input">
    <bg-size-item
      v-for="item in bgSizeTypes"
      :key="item"
      :type="item"
      :active="item === currentType"
      @select="handleSelect"></bg-size-item>
  </div>
</template>

<script>
import bgSizeItem from './bg-size-item.vue'

export default {
  components: {
    bgSizeItem
  },
  data () {
    return {
      bgSizeTypes: ['default', 'cover', 'contain', 'stretch', 'stretch-x'],
      currentType: 'default'
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
