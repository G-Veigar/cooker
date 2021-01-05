<template>
  <div class="box-model">
    <div class="box margin-box">
      <div class="box-name">margin</div>
      <!-- margin top right bottom left -->
      <input class="box-item-val box-item-top margin-top" type="number" :value="nodeBoxStyle.margin.top" @input="handleInput('marginTop', $event)"/>
      <input class="box-item-val box-item-right margin-right" type="number" :value="nodeBoxStyle.margin.right" @input="handleInput('marginRight', $event)"/>
      <input class="box-item-val box-item-bottom margin-bottom" type="number" :value="nodeBoxStyle.margin.bottom" @input="handleInput('marginBottom', $event)"/>
      <input class="box-item-val box-item-left margin-left" type="number" :value="nodeBoxStyle.margin.left" @input="handleInput('marginLeft', $event)"/>

      <div class="box border-box">
        <div class="box-name">border</div>
        <!-- border top right bottom left -->
        <input class="box-item-val box-item-top border-top" type="number" :value="nodeBoxStyle.border.top" @input="handleInput('borderLeftWidth', $event)">
        <input class="box-item-val box-item-right border-right" type="number" :value="nodeBoxStyle.border.right" @input="handleInput('borderRightWidth', $event)">
        <input class="box-item-val box-item-bottom border-bottom" type="number" :value="nodeBoxStyle.border.bottom" @input="handleInput('borderBottomWidth', $event)">
        <input class="box-item-val box-item-left border-left" type="number" :value="nodeBoxStyle.border.left" @input="handleInput('borderLeftWidth', $event)">

        <div class="box padding-box">
          <div class="box-name">padding</div>
          <!-- padding top right bottom left -->
          <input class="box-item-val box-item-top padding-top" type="number" :value="nodeBoxStyle.padding.top" @input="handleInput('paddingTop', $event)">
          <input class="box-item-val box-item-right padding-right" type="number" :value="nodeBoxStyle.padding.right" @input="handleInput('paddingRight', $event)">
          <input class="box-item-val box-item-bottom padding-bottom" type="number" :value="nodeBoxStyle.padding.bottom" @input="handleInput('paddingBottom', $event)">
          <input class="box-item-val box-item-left padding-left" type="number" :value="nodeBoxStyle.padding.left" @input="handleInput('paddingLeft', $event)">

          <div class="content-box">
            <input class="content-width" type="number" :value="nodeBoxStyle.width" @input="handleInput('width', $event)"/>
            <div class="content-divider">×</div>
            <input class="content-height" type="number" :value="nodeBoxStyle.height" @input="handleInput('height', $event)"/>
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
      require: true,
      default () {
        return {
          style: {}
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    nodeBoxStyle () {
      const {
        width, height,
        paddingTop, paddingRight, paddingBottom, paddingLeft,
        marginTop, marginRight, marginBottom, marginLeft,
        borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth
      } = this.node.style
      return {
        width: parseInt(width) || 0,
        height: parseInt(height) || 0,
        padding: {
          top: parseInt(paddingTop) || 0,
          right: parseInt(paddingRight) || 0,
          bottom: parseInt(paddingBottom) || 0,
          left: parseInt(paddingLeft) || 0
        },
        border: {
          top: parseInt(borderTopWidth) || 0,
          right: parseInt(borderRightWidth) || 0,
          bottom: parseInt(borderBottomWidth) || 0,
          left: parseInt(borderLeftWidth) || 0
        },
        margin: {
          top: parseInt(marginTop) || 0,
          right: parseInt(marginRight) || 0,
          bottom: parseInt(marginBottom) || 0,
          left: parseInt(marginLeft) || 0
        }
      }
    }
  },
  methods: {
    handleInput (styleProp, e) {
      this.$emit('input', {
        [styleProp]: `${e.target.value}px`
      })
    }
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
