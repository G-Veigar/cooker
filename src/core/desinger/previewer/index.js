/*
 * @Author: 高歌
 * @Date: 2020-09-22 12:51:21
 * @LastEditTime: 2020-09-22 14:50:06
 * @LastEditors: 高歌
 * @FilePath: /cooker3/src/previewer/index.js
 * @Description:
 */
class Previewer {
  constructor (el, options) {
    this._el = el // dom挂载点
    if (typeof el === 'string') {
      this._el = document.querySelector(el)
    }
    this._options = options
    this._messageHandles = {}
    this.createViewer()
    if (!Previewer.listening) {
      window.addEventListener('message', (e) => {
        const { type, data } = e.data
        const callBack = this._messageHandles[type]
        if (callBack) {
          callBack(data)
        }
      }, false)
      Previewer.listening = true
    }
  }

  createViewer () {
    const iframe = document.createElement('iframe')
    iframe.src = this._options.src
    this._el.appendChild(iframe)
    this._iframeWindow = iframe.contentWindow
  }

  emit (data) {
    this._iframeWindow.postMessage(data, '*')
  }

  on (eventName, callBack) {
    this._messageHandles[eventName] = callBack
  }
}

export default Previewer
