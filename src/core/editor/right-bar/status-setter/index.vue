<template>
  <div class="status-setter">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="特殊状态" name="特殊状态">
        <div class="input-item">
          <label class="input-input-label">显隐状态：</label>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-item">
          <label class="input-input-label">循环数据：</label>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="新增状态" name="新增状态">
        <el-form
          label-position="right"
          label-width="80px"
          :model="formLabelAlign"
          :rules="rules">
          <el-form-item label="变量名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="formLabelAlign.type" placeholder="请选择类型">
              <el-option
                v-for="item in statusTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认值" prop="defaultValue">
            <el-input v-model="formLabelAlign.defaultValue"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="formLabelAlign.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNewStatus">添加状态</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="状态列表" name="状态列表">
        <el-table
          :data="statusList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="变量名">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="defaultValue"
            label="默认值">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述">
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
      activeNames: ['特殊状态', '新增状态', '状态列表'],
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
      statusTypes: [
        {
          label: 'Number',
          value: 'Number'
        },
        {
          label: 'String',
          value: 'String'
        },
        {
          label: 'Boolean',
          value: 'Boolean'
        },
        {
          label: 'Object',
          value: 'Object'
        },
        {
          label: 'Array',
          value: 'Array'
        },
        {
          label: 'Set',
          value: 'Set'
        },
        {
          label: 'Map',
          value: 'Map'
        }
      ],
      formLabelAlign: {
        name: '',
        type: '',
        defaultValue: '',
        desc: ''
      },
      statusList: [
        {
          name: 'type',
          type: 'Number',
          defaultValue: 0,
          desc: '活动类型'
        },
        {
          name: 'orderList',
          type: 'Array',
          defaultValue: '[]',
          desc: '订单列表'
        },
        {
          name: 'disabled',
          type: 'Boolean',
          defaultValue: 'false',
          desc: '是否禁用'
        }
      ],
      input: ''
    }
  },
  methods: {
    addNewStatus () {
      console.log('addNewStatus')
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
