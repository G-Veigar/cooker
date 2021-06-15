<template>
  <div class="event-select">
    <div
      class="event-item"
      v-for="item in eventList"
      :key="item"
      @click="addEvent(item)">{{item}}</div>
  </div>
</template>

<script>
// TODO：抽象所有事件
const eventList = ['click', 'dbclick']

export default {
  data () {
    return {
      eventList
    }
  },
  methods: {
    addEvent (eventName) {
      this.$emit('select', eventName)
    }
  }
}
</script>

<style lang="scss">
.event-select {
  position: absolute;
  top: 30px;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  .event-item {
    padding: 2px 10px;
    cursor: default;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
