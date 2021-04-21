const baseAction = {
  navTo: {
    desc: '链接跳转',
    params: {
      url: {
        type: String
      }
    }
  },
  setData: {
    desc: '设置数据',
    params: null
  },
  hide: {
    desc: '隐藏',
    params: null
  },
  show: {
    desc: '展示',
    params: null
  }
}

export default baseAction
