function setData ({ key, val }) {
  this.$set(this.stateData, key, val)
}

function hide ({ nodeId }) {
  setData.call(this, {
    key: nodeId + 'Show',
    val: false
  })
}

function show ({ nodeId }) {
  setData.call(this, {
    key: nodeId + 'Show',
    val: true
  })
}

export {
  setData,
  hide,
  show
}
