import keyboardJS from 'keyboardjs'
import Vue from 'vue'
import schema from '@/core/schema'

const keyboard = {
  init () {
    // 复制
    keyboardJS.bind('command + c', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    })
    // 剪切
    keyboardJS.bind('command + x', (e) => {
      e.preventDefault()
      schema.removeNode(schema.currentNode)
    })
    // 粘贴
    keyboardJS.bind('command + v', (e) => {
      e.preventDefault()
      console.log('粘贴')
    })
    // 删除
    keyboardJS.bind(['backspace', 'delete'], (e) => {
      e.preventDefault()
      schema.removeNode(schema.currentNode)
    })
    // 撤销
    keyboardJS.bind('command + z', (e) => {
      e.preventDefault()
      schema.undoHelper.undo()
    })
    // 重做
    keyboardJS.bind('command + shift + z', (e) => {
      e.preventDefault()
      schema.undoHelper.redo()
    })
    // 保存
    keyboardJS.bind('command + s', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: 'save',
        type: 'success'
      })
    })

    // 放大
    keyboardJS.bind('command + =', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: '放大',
        type: 'success'
      })
    })
    // 缩小
    keyboardJS.bind('command + -', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: '缩小',
        type: 'success'
      })
    })

    /* 方向键 */
    // up
    keyboardJS.bind('up', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: 'up',
        type: 'success'
      })
    })
    // down
    keyboardJS.bind('down', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: 'down',
        type: 'success'
      })
    })
    // left
    keyboardJS.bind('left', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: 'left',
        type: 'success'
      })
    })
    // right
    keyboardJS.bind('right', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: 'right',
        type: 'success'
      })
    })
  }
}

export default keyboard
