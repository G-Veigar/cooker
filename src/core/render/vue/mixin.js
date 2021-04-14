import event from '@/utils/event'

const renderMixin = {
  methods: {
    _emitEvent: function (eventName) {
      event.emit(eventName)
    },
    _onEvent: function (eventName, cb) {
      console.log('_onEvent', eventName, cb)
      event.on(eventName, cb)
    }
  }
}

export default renderMixin
