<template>
  <div class="text">
    rxjs
  </div>
</template>

<script>
import { Observable } from 'rxjs'

// eslint-disable-next-line no-unused-vars
const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 3000)
})

console.log('just before subscribe')

observable.subscribe({
  next (x) {
    console.log('got value ' + x)
  },
  error (err) {
    console.error('something wrong occurred: ' + err)
  },
  complete () {
    console.log('done')
  }
})

console.log('just after subscribe')

export default {
}
</script>

<style lang="scss">
.screen-main {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>
