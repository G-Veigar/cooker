import keyboardJS from 'keyboardjs'

const keyboard = {
  init () {
    // 复制
    keyboardJS.on('command + c', (e) => {
      e.preventDefault()
      console.log('复制')
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
