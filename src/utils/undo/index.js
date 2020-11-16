class Undo {
  constructor () {
    this.operationList = [] // 操作集合
    this.operationMap = new Map()
    this.index = 0 // 当前的操作位置
  }

  add ({ redo, undo }) {
    this.operationMap.set(redo, undo)
  }

  redo () {
    console.log('redo')
  }

  undo () {
    console.log('undo')
  }
}

const undoHelper = new Undo()

undoHelper.redo()

// export default Undo
