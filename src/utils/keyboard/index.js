import keyboardJS from 'keyboardjs'
import Vue from 'vue'

const keyboard = {
  init () {
    // 复制
    keyboardJS.on('command + c', (e) => {
      e.preventDefault()
      Vue.prototype.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    })
    // 粘贴
    keyboardJS.on('command + v', (e) => {
      e.preventDefault()
      console.log('粘贴')
    })
    // 撤销
    keyboardJS.on('command + z', (e) => {
      e.preventDefault()
      console.log('撤销')
    })
  }
}

export default keyboard
