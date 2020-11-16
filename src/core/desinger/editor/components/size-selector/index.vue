<template>
  <div class="size-selector">
    <input
      class="selector-input"
      type="number"
      :value="value"
      @input="handleInput" />
    <div class="unit-type">px</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {}
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
.size-selector {
  height: 24px;
  display: flex;
  align-items: stretch;

  .selector-input {
    width: 30px;
    font-size: 12px;
  }

  .unit-type {
    font-size: 12px;
    color: #999;
    font-weight: bold;
  }
}
</style>
