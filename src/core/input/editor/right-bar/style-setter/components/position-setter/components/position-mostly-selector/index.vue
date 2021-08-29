<template>
  <div class="background-position-input">
    <bg-position-item
      v-for="item in options"
      :key="item"
      :type="item"
      :active="item === currentType"
      @select="handleSelect"></bg-position-item>
  </div>
</template>

<script>
import bgPositionItem from './bg-position-item.vue'

export default {
  components: { bgPositionItem },
  data () {
    return {
      options: [
        'left-top', 'center-top', 'right-top',
        'center-left', 'center-center', 'center-right',
        'bottom-left', 'bottom-center', 'bottom-right'
      ],
      currentType: 'left-top'
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
.background-position-input {
  display: flex;
  flex-wrap: wrap;
  width: 60px;
  height: 60px;
  justify-content: space-between;
}
</style>
