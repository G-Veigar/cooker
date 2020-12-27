// 节流函数，一段时间执行一次
const throttle = (fun, time) => {
  let datePre
  return function (...args) {
    const now = +new Date()
    if (!datePre || (now - datePre > time)) {
      fun.call(this, ...args)
      datePre = now
    }
  }
}

// 防抖函数，一段时间后才执行
const debounce = (fun, time) => {
  let timer
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fun.call(this, ...args)
    }, time)
  }
}

// 设置值
const setValByPath = (obj, path, val) => {
  const pathArr = path.split('.')
  const lastKey = pathArr[pathArr.length - 1]
  for (let i = 0; i < pathArr.length - 1; i++) {
    obj = obj[pathArr[i]] || {}
  }
  obj[lastKey] = val
}

const getValByPath = (obj, path) => {
  const pathArr = path.split('.')
  for (let i = 0; i < pathArr.length; i++) {
    obj = obj[pathArr[i]]
  }
  return obj
}

export {
  throttle,
  debounce,
  setValByPath,
  getValByPath
}
