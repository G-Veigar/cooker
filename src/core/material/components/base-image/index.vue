<template>
  <img
    class="base-image"
    @error="handleLoadError"
    :src="src"
    alt="">
</template>

<script>
export default {
  props: {
    src: {
      required: true,
      type: String
    },
    loadingImg: {
      type: String
    },
    errorImg: {
      type: String
    },
    desc: {
      type: String
    },
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleLoadError () {
      if (this.errorImg) {
        this.src = this.errorImg
      }
    }
  },
  created () {
    if (this.loadingImg) {
      const realSrc = this.src
      const img = new Image()
      img.onload = () => {
        this.src = realSrc
      }
      img.onerror = () => {
        this.src = this.errorImg
      }
      img.src = realSrc
      this.src = this.loadingImg
    }
  }
}
</script>

<style>

</style>
