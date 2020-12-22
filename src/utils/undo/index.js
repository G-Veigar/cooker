class Undo {
  constructor () {
    this.operationList = [] // 操作集合
    this.operationMap = new Map()
    this.index = -1 // 当前的操作位置
  }

  add ({ redo, undo, reversible = false }) {
    const undoThis = this
    let result
    this.operationMap.set(redo, undo)
    const doFun = function (...params) {
      const res = redo.call(this, ...params)
      const opRecord = new OperationRecord({
        operation: redo,
        params: params,
        scope: this
      })
      undoThis.operationList.push(opRecord)
      undoThis.index++
      return res
    }
    result = doFun
    // 如果是可逆的
    if (reversible) {
      this.operationMap.set(undo, redo)
      const undoFun = function (...params) {
        const res = undo.call(this, ...params)
        const opRecord = new OperationRecord({
          operation: undo,
          params: params,
          scope: this
        })
        undoThis.operationList.push(opRecord)
        undoThis.index++
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
      const scope = operationRecord.scope
      operation.call(scope, ...params)
    }
  }

  undo () {
    if (this.operationList.length > 0 && this.index >= 0) {
      const operationRecord = this.operationList[this.index]
      const operation = operationRecord.operation
      const params = operationRecord.params
      const scope = operationRecord.scope
      const undoOprtation = this.operationMap.get(operation)
      undoOprtation.call(scope, ...params)
      this.index--
    }
  }
}

class OperationRecord {
  constructor (params) {
    this.operation = params.operation
    this.params = params.params
    this.scope = params.scope
  }
}

export default Undo
