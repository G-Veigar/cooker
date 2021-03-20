<template>
  <div class="cooker-modal" v-if="modalVisible">
    <div class="modal-mask" @click.self="handleMaskClick"></div>
    <div class="modal-content">modal</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    animate: {
      type: String
    }
  },
  data () {
    return {
      modalVisible: false
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          this.modalVisible = val
        } else {
          if (!this.animate) {
            this.modalVisible = false
          } else {
            // TODO: 动画逻辑
            this.modalVisible = false
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleMaskClick () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.cooker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal-content {
    width: 80%;
    background-color: #fff;
    z-index: 1;
  }
}
</style>
