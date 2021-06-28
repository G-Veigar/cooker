<template>
  <div class="text-helper">
    <div class="toolbar" v-show="toolbarVisible" @mousedown.prevent="handleClick">
      <div class="tool-item" @click="operate('underline')">U</div>
      <div class="tool-item" @click="operate('italic')">I</div>
      <div class="tool-item" @click="operate('lineThrough')">L</div>
    </div>
    <div class="text-wrapper">
      <div class="text" @input="handleInput">
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
    return {
      text: 'this is a text',
      editText: 'this is a text',
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
      return 'this is a text'
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
      this.text = e.target.innerText
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
