// TODO: nativeOn兼容
function parseEventHandle ($this, schemaNode) {
  const res = {
    on: {},
    nativeOn: {}
  }
  const eventEmit = schemaNode.event.emit
  const eventOn = schemaNode.event.on
  // 事件触发
  for (const eventName in eventEmit) {
    res.on[eventName] = $this._emitEvent.bind($this, eventEmit[eventName])
  }
  // 事件监听
  for (const eventName in eventOn) {
    const actionData = eventOn[eventName]
    const { type, name, params } = actionData
    let actionFun
    if (type === 'base') {
      // TODO：fix params
      actionFun = $this._action.bind($this, name, { ...params })
    }
    $this._onEvent(eventName, actionFun)
  }
  return res
}

export { parseEventHandle }
