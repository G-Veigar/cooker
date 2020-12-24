class Undo {
  constructor () {
    this.operationList = [] // 操作集合
    this.operationMap = new Map()
    this.index = -1 // 当前的操作位置
  }

  add ({ redo, undo }) {
    const undoThis = this
    this.operationMap.set(redo, undo)
    const doFun = function (...params) {
      const res = redo.call(this, ...params)
      const opRecord = new OperationRecord({
        operation: redo,
        params: params,
        scope: this,
        res
      })
      // 当后面有执行记录，又执行了新操作，丢弃后面的执行记录
      if (++undoThis.index < undoThis.operationList.length) {
        undoThis.operationList.length = ++undoThis.index
      }
      undoThis.operationList.push(opRecord)
      return res
    }
    return doFun
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
      const res = operationRecord.res
      const undoOprtation = this.operationMap.get(operation)
      undoOprtation.call(scope, {
        params,
        res
      })
      this.index--
    }
  }
}

class OperationRecord {
  constructor (params) {
    this.operation = params.operation
    this.params = params.params
    this.scope = params.scope
    this.res = params.res
  }
}

export default Undo
