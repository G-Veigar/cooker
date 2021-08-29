<template>
  <div
    class="size-wrapper"
    @mousedown="handleOperatePointMousedown"
    :style="wrapperStyle">
    <div
        class="size-operate-point"
        v-for="(item, index) in (active? pointList : [])"
        :class="item"
        :key="index"
        :style="pointStyle[item]">
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: true,
      includesPoint: ['rightBottom'],
      allPointList: ['top', 'right', 'bottom', 'left', 'leftTop', 'rightTop', 'leftBottom', 'rightBottom'],
      currentPos: {
        left: 0,
        right: 0,
        width: 0,
        height: 0
      },
      currentOperation: {
      }
    }
  },
  computed: {
    pointList () {
      return this.allPointList.filter(item => {
        return this.includesPoint.includes(item)
      })
    },
    pointStyle () {
      return {
        top: {
          top: '0',
          left: '50%',
          cursor: 'ns-resize'
        },
        rightTop: {
          left: '100%',
          top: '0',
          cursor: 'nesw-resize'
        },
        right: {
          left: '100%',
          top: '50%',
          cursor: 'ew-resize'
        },
        rightBottom: {
          left: '100%',
          top: '100%',
          cursor: 'nwse-resize'
        },
        bottom: {
          top: '100%',
          left: '50%',
          cursor: 'ns-resize'
        },
        leftBottom: {
          top: '100%',
          left: '0',
          cursor: 'nesw-resize'
        },
        left: {
          left: '0',
          top: '50%',
          cursor: 'ew-resize'
        },
        leftTop: {
          left: '0',
          top: '0',
          cursor: 'nwse-resize'
        }
      }
    },
    wrapperStyle () {
      return {
        width: this.currentPos.width + 'px',
        height: this.currentPos.height + 'px',
        left: this.currentPos.left + 'px',
        top: this.currentPos.top + 'px'
      }
    }
  },
  mounted () {
    this.innerEl = this.$slots.default[0].elm
    const elSizeInfo = this.innerEl.getBoundingClientRect()
    this.currentPos = {
      width: elSizeInfo.width,
      height: elSizeInfo.height,
      left: elSizeInfo.left,
      top: elSizeInfo.top
    }
  },
  methods: {
    handleOperatePointMousedown (e) {
      const classList = e.target.classList
      if (classList.contains('size-operate-point')) {
        this.currentOperation = {
          isTop: classList.contains('top'),
          isRightTop: classList.contains('rightTop'),
          isRight: classList.contains('right'),
          isRightBottom: classList.contains('rightBottom'),
          isBottom: classList.contains('bottom'),
          isLeftBottom: classList.contains('leftBottom'),
          isLeft: classList.contains('left'),
          isLeftTop: classList.contains('leftTop'),
          x: e.clientX,
          y: e.clientY
        }
        document.addEventListener('mousemove', this.handleMousemove)
        document.addEventListener('mouseup', this.handleMouseup)
      }
    },
    handleMousemove (e) {
      const currX = e.clientX
      const currY = e.clientY
      const diffX = currX - this.currentOperation.x
      const diffY = currY - this.currentOperation.y
      console.log(diffX, diffY)
      const { isTop, isRight, isBottom, isLeft } = this.currentOperation
      // eslint-disable-next-line no-unused-vars
      const { height, width, left, top } = this.currentPos

      const newPos = {}

      // 处理高度
      if (isLeft || isRight) {
        newPos.height = height
      } else {
        const newHeight = height + diffY
        newPos.height = newHeight > 0 ? newHeight : 0
      }

      // 处理宽度
      if (isTop || isBottom) {
        newPos.width = width
      } else {
        const newWidth = width + diffX
        newPos.width = newWidth > 0 ? newWidth : 0
      }

      this.currentPos = newPos
    },
    handleMouseup () {
      document.removeEventListener('mousemove', this.handleMousemove)
      document.removeEventListener('mouseup', this.handleMouseup)
    }
  }
}
</script>

<style lang="scss">
.size-wrapper {
  position: relative;
  border: 1px solid #000;
  .size-operate-point {
    width: 5px;
    height: 5px;
    border: 1px solid #000;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}
</style>
