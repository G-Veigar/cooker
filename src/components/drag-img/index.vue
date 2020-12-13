<template>
  <div class="drag-img-wrapper" ref="wrapper">
    <div
      v-for="item in dragList"
      class="drag-img"
      ref="dragImg"
      :key="item.name">
      <i class="iconfont" :class="item.icon"></i>
      <div class="material-name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import event from '@/utils/event'

export default {
  data () {
    return {
      dragList: []
    }
  },
  methods: {
    createImg (componentList) {
      return new Promise((resolve, reject) => {
        const resMap = {}
        let resCount = 0
        this.dragList = componentList
        this.$nextTick(() => {
          for (let i = 0; i < componentList.length; i++) {
            html2canvas(this.$refs.dragImg[i]).then(canvas => {
              this.$refs.wrapper.append(canvas)
              resMap[componentList[i].name] = canvas
              resCount++
              if (resCount === componentList.length) {
                resolve(resMap)
              }
            })
          }
        })
      })
    }
  },
  mounted () {
    event.on('create-drag-img', async list => {
      const res = await this.createImg(list)
      event.emit('drag-img-created', res)
    })
  }
}
</script>

<style lang="scss" scoped>
.drag-img-wrapper {
  display: flex;
  position: fixed;
  left: 100%;
  top: 100%;

  .drag-img {
    flex: none;
    display: flex;
    align-items: center;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    background: #dddddd;
    border: 1px solid #999;
    padding: 0 4px;

    .material-name {
      margin-left: 2px;
      position: relative;
      top: -3px;
    }
  }
}
</style>
