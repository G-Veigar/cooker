class Undo {
  constructor () {
    this.operationList = [] // 操作集合
    this.operationMap = new Map()
    this.index = -1 // 当前的操作位置
  }

  add ({ redo, undo, reversible = false }) {
    let result
    this.operationMap.set(redo, undo)
    const doFun = (...params) => {
      const res = redo(...params)
      const opRecord = new OperationRecord({
        operation: redo,
        params: params
      })
      this.operationList.push(opRecord)
      this.index++
      return res
    }
    result = doFun
    // 如果是可逆的
    if (reversible) {
      this.operationMap.set(undo, redo)
      const undoFun = (...params) => {
        const res = undo(...params)
        const opRecord = new OperationRecord({
          operation: undo,
          params: params
        })
        this.operationList.push(opRecord)
        this.index++
        return res
      }
      result = {
        redo: doFun,
        undo: undoFun
      }
    }
    return result
  }

  redo () {
    if (this.operationList.length > 0 && (this.index <= this.operationList.length - 2)) {
      // 指针移动到下面一个操作
      this.index++
      const operationRecord = this.operationList[this.index]
      const operation = operationRecord.operation
      const params = operationRecord.params
      operation(...params)
    }
  }

  undo () {
    if (this.operationList.length > 0 && this.index >= 0) {
      const operationRecord = this.operationList[this.index]
      const operation = operationRecord.operation
      const params = operationRecord.params
      const undoOprtation = this.operationMap.get(operation)
      undoOprtation(...params)
      this.index--
    }
  }
}

class OperationRecord {
  constructor (params) {
    this.operation = params.operation
    this.params = params.params
  }
}

export default Undo
