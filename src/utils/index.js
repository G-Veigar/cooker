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

export {
  throttle,
  debounce
}
