<template>
  <div class="position-setter">
    <div class="input-item">
      <div class="input-label">定位：</div>
      <position-selector></position-selector>
    </div>
    <div class="input-item">
      <position-mostly-selector></position-mostly-selector>
    </div>
  </div>
</template>

<script>
import positionSelector from './components/position-selector'
import positionMostlySelector from './components/position-mostly-selector'

export default {
  components: {
    positionSelector,
    positionMostlySelector
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.input-item {
  display: flex;
  align-items: center;

  .input-label {
    font-size: 12px;
    width: 80px;
  }
}
</style>
