class Vnode {
  constructor (type) {
    this.tag = type
    this.text = type
    this.style = {}
  }

  setStyle (key, val) {
    this.style[key] = val
  }
}

export default Vnode
