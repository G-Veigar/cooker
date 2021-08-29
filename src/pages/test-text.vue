<template>
  <div class="text-helper">
    <div class="toolbar" v-show="toolbarVisible" @mousedown.prevent="handleClick">
      <div class="tool-item" @click="operate('underline')">U</div>
      <div class="tool-item" @click="operate('italic')">I</div>
      <div class="tool-item" @click="operate('lineThrough')">L</div>
    </div>
    <div class="text-wrapper">
      <div
        class="text"
        :contenteditable="true"
        @input="handleInput">
        {{text}}
      </div>
      <div class="edit-text" v-html="textHtml">
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data () {
    const text = 'thisAtext'
    return {
      text,
      editText: text,
      selectLeftIndex: 0,
      selectRightIndex: 0,
      operationRecord: []
    }
  },
  computed: {
    toolbarVisible () {
      return this.selectLeftIndex !== this.selectRightIndex
    },
    // TODO: 解析成html算法
    textHtml () {
      // this.operationRecord.forEach(record => {
      //   const leftStr = this.editText.slice(0, record.offset[0] - 1)
      //   const str = this.editText.slice(record.offset[0] - 1, record.offset[1] - 1)
      //   const rightStr = this.editText.slice(record.offset[1] - 1)
      //   console.log(leftStr)
      //   console.log(str)
      //   console.log(rightStr)
      // })
      const record = this.operationRecord[0]
      if (record) {
        const leftStr = this.editText.slice(0, record.offset[0] - 1)
        const str = this.editText.slice(record.offset[0] - 1, record.offset[1] - 1)
        const rightStr = this.editText.slice(record.offset[1] - 1)
        const resStr = `<span>${leftStr}<span class='underline'>${str}</span>${rightStr}</span>`
        console.log(resStr)
        return resStr
      } else {
        return this.editText
      }
    }
  },
  methods: {
    handleClick () {
    },
    operate (type) {
      this.operationRecord.push({
        type,
        offset: [this.selectLeftIndex, this.selectRightIndex]
      })
    },
    handleInput (e) {
      this.editText = e.target.innerText
    },
    selecText (anchorOffset, focusOffset) {
      if (anchorOffset < focusOffset) {
        this.selectLeftIndex = anchorOffset
        this.selectRightIndex = focusOffset
      } else {
        this.selectLeftIndex = focusOffset
        this.selectRightIndex = anchorOffset
      }
    }
  },
  created () {
    const handleSelectionChange = debounce(e => {
      const selection = document.getSelection()
      this.selecText(selection.anchorOffset, selection.focusOffset)
    }, 500)
    document.addEventListener('selectionchange', handleSelectionChange)
  }
}
</script>

<style lang="scss">
.text-helper {
  padding-top: 100px;
}
.screen-main {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.toolbar {
  position: absolute;
  display: flex;
  top: 50px;
  .tool-item {
    width: 24px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
}

.text-wrapper {
  position: relative;
  .text {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 4px;
    padding-right: 4px;
    caret-color: #000;
    color: transparent;
    outline: none;
  }
  .edit-text {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 4px;
    padding-right: 4px;
  }
}
</style>

<style lang="scss">
.underline {
  text-decoration: underline;
}
</style>
