// 生成唯一id
function uid () {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
}

export default uid
