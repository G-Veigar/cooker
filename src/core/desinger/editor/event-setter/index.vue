<template>
  <div class="event-setter">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="事件监听" name="事件监听">
        <el-button type="primary" @click="addNewListener">添加监听器</el-button>
        <el-table
          :data="onEvents"
          stripe
          style="width: 100%">
          <el-table-column
            prop="eventName"
            label="事件key">
          </el-table-column>
          <el-table-column
            prop="name"
            label="监听器">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="事件触发" name="事件触发">
        <div class="event-select-wrapper">
          <el-button type="primary" @click="addNewEimtter">添加触发器</el-button>
          <event-select v-show="eventSelectShow"></event-select>
        </div>
        <el-table
          :data="emitEvents"
          stripe
          style="width: 100%">
          <el-table-column
            prop="eventType"
            label="事件类型">
          </el-table-column>
          <el-table-column
            prop="eventName"
            label="事件key">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import eventMap from '@/core/event'
import eventSelect from '@/components/event-select'

export default {
  components: {
    eventSelect
  },
  data () {
    return {
      activeNames: ['事件监听', '事件触发'],
      rules: {
        name: [
          { required: true, message: '请输入变量名', trigger: 'blur' },
          { min: 3, max: 30, message: '变量名长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请至少类型', trigger: 'change' }
        ],
        defaultValue: [],
        desc: [
          { max: 50, message: '描述最多 50 字符', trigger: 'blur' }
        ]
      },
      eventSelectShow: false
    }
  },
  computed: {
    ...mapState({
      currentNode: state => state.schema.currentNode
    }),
    onEvents () {
      const eventList = []
      const eventMap = this.currentNode?.event?.on
      if (eventMap) {
        for (const key in eventMap) {
          eventList.push({ eventName: key, ...eventMap[key] })
        }
      }
      return eventList
    },
    emitEvents () {
      const eventList = []
      const eventMap = this.currentNode?.event?.emit
      if (eventMap) {
        for (const key in eventMap) {
          eventList.push({ eventType: key, eventName: eventMap[key] })
        }
      }
      return eventList
    }
  },
  methods: {
    addNewStatus () {
      console.log('addNewStatus')
    },
    addNewListener () {
      console.log('addNewListener')
    },
    addNewEimtter () {
      this.eventSelectShow = true
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.event-setter {
  .el-collapse-item__header {
    height: 30px;
    text-indent: 10px;
    color: #555;
  }

  .el-collapse-item__wrap {
    background-color: #F4F4F4;
  }

  .el-collapse-item__content {
    padding: 10px;
    overflow: visible;
  }

  .input-item {
    margin: 6px;
    display: flex;
    .input-input-label {
      flex: none;
    }
  }

  .event-select-wrapper {
    position: relative;
  }
}
</style>
