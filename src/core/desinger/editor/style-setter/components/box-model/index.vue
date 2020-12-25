<template>
  <div class="box-model">
    <div class="box margin-box">
      <div class="box-name">margin</div>
      <!-- margin top right bottom left -->
      <input class="box-item-val box-item-top margin-top" type="number" v-model.number="margin.top" />
      <input class="box-item-val box-item-right margin-right" type="number" v-model.number="margin.right" />
      <input class="box-item-val box-item-bottom margin-bottom" type="number" v-model.number="margin.bottom" />
      <input class="box-item-val box-item-left margin-left" type="number" v-model.number="margin.left" />

      <div class="box border-box">
        <div class="box-name">border</div>
        <!-- border top right bottom left -->
        <input class="box-item-val box-item-top border-top" type="number" v-model.number="border.top">
        <input class="box-item-val box-item-right border-right" type="number" v-model.number="border.right">
        <input class="box-item-val box-item-bottom border-bottom" type="number" v-model.number="border.bottom">
        <input class="box-item-val box-item-left border-left" type="number" v-model.number="border.left">

        <div class="box padding-box">
          <div class="box-name">padding</div>
          <!-- padding top right bottom left -->
          <input class="box-item-val box-item-top padding-top" type="number" v-model.number="padding.top">
          <input class="box-item-val box-item-right padding-right" type="number" v-model.number="padding.right">
          <input class="box-item-val box-item-bottom padding-bottom" type="number" v-model.number="padding.bottom">
          <input class="box-item-val box-item-left padding-left" type="number" v-model.number="padding.left">

          <div class="content-box">
            <input class="content-width" type="number" v-model.number="width" />
            <div class="content-divider">×</div>
            <input class="content-height" type="number" v-model.number="height" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      border: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  },
  computed: {
    styleObject () {
      const res = {
        width: this.width,
        height: this.height,
        paddingTop: this.padding.top,
        paddingRight: this.padding.right,
        paddingBottom: this.padding.bottom,
        paddingLeft: this.padding.left,
        borderTopWidth: this.border.top,
        borderRightWidth: this.border.right,
        borderBottomWidth: this.border.bottom,
        borderLeftWidth: this.border.left,
        marginTop: this.margin.top,
        marginRight: this.margin.right,
        marginBottom: this.margin.bottom,
        marginLeft: this.margin.left
      }
      return res
    }
  },
  methods: {
  },
  watch: {
    styleObject (val) {
      this.$emit('input', {
        fontSize: val + 'px'
      })
    }
  },
  mounted () {
    // console.log('styleObject', this.styleObject)
  }
}
</script>

<style lang="scss">
$box-item-width: 24px;

.box-model {
  display: inline-block;

  input {
    background: transparent;
    border: none;
    text-align: center;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
.box {
  padding: $box-item-width;
  position: relative;
  border: 1px solid #666;

  &.margin-box {
    background-color: #F4A460;
  }

  &.border-box {
    background-color: #F0E68C;
  }

  &.padding-box {
    background-color: #99CC66;
  }
}
.box-item-val {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;

  &.box-item-top {
    top: 0;
    height: $box-item-width;
    left: 50%;
    transform: translateX(-50%);
  }

  &.box-item-right {
    top: 50%;
    right: 0;
    width: $box-item-width;
    transform: translateY(-50%);
  }

  &.box-item-bottom {
    bottom: 0;
    left: 50%;
    height: $box-item-width;
    transform: translateX(-50%);
  }

  &.box-item-left {
    top: 50%;
    left: 0;
    width: $box-item-width;
    transform: translateY(-50%);
  }
}
.content-box {
  width: 110px;
  height: 26px;
  background-color: #87CEEB;
  border: 1px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  .content-width {
    min-width: 16px;
  }

  .content-height {
    min-width: 16px;
  }
}
.box-name {
  position: absolute;
  left: 4px;
  top: 2px;
  font-size: 12px;
  color: #333;
}
</style>
