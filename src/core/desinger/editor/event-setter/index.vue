<template>
  <div class="status-setter">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="事件监听" name="事件监听">
        <el-button type="primary" @click="addNewListener">添加监听器</el-button>
        <el-table
          :data="listeners"
          stripe
          style="width: 100%">
          <el-table-column
            prop="event"
            label="事件">
          </el-table-column>
          <el-table-column
            prop="handler"
            label="监听器">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="事件触发" name="事件触发">
        <el-table
          :data="events"
          stripe
          style="width: 100%">
          <el-table-column
            prop="event"
            label="事件">
          </el-table-column>
          <el-table-column
            prop="handler"
            label="监听器">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
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
      listeners: [
        {
          event: '#btn@click.self',
          handler: '{}'
        },
        {
          event: 'this@mounted',
          handler: "{console.log('222')}"
        }
      ],
      events: [
        {
          event: 'this@mounted',
          handler: "{console.log('111')}"
        }
      ]
    }
  },
  methods: {
    addNewStatus () {
      console.log('addNewStatus')
    },
    addNewListener () {
      console.log('addNewListener')
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.status-setter {
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
}
</style>
