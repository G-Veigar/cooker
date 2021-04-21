
<script>
// eslint-disable-next-line no-unused-vars
import { schema2RenderParmas } from './utils.js'
import event from '@/utils/event'
import action from './actions'

export default {
  data () {
    return {
      // TODO：无法使用_开头
      stateData: {
        '123Show': true
      }
    }
  },
  props: {
    schema: { // json描述
      type: Object,
      require: true
    },
    editMode: { // 编辑模式
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: String
    }
  },
  computed: {
    schemaData () {
      return this.schema
    }
  },
  watch: {
    currentNodeId (nodeId) {
      const el = document.getElementById(nodeId)
      this.activeEl && (this.activeEl.style.outline = '')
      el.style.outline = '1px solid #1861d5'
      this.activeEl = el
    }
  },
  methods: {
    _emitEvent: function (eventName) {
      event.emit(eventName)
    },
    _onEvent: function (eventName, cb) {
      event.on(eventName, cb)
    },
    _action (actionType, params) {
      console.log('this', this)
      action[actionType].call(this, params)
    },
    handleDragover (e) {
      e.preventDefault()
    },
    handleDrop (e) {
      e.preventDefault()
      const materialData = e.dataTransfer.getData('materialData')
      const data = JSON.parse(materialData)
      console.log('handleDrop', data)
      window.parent.postMessage({
        type: 'dropedNode',
        data
      }, '*')
    },
    editModeInit (el) {
      // 点击选中态
      document.querySelector(el).addEventListener('click', (e) => {
        const activeEl = e.target
        if (activeEl !== this.activeEl || !this.activeEl) {
          window.parent.postMessage({
            type: 'currentElChange',
            data: {
              nodeId: activeEl.id
            }
          }, '*')
        }
      })
      // 获取选中项配置数据
    }
  },
  render (h) {
    // eslint-disable-next-line no-unused-vars
    const { element, attribute, children } = schema2RenderParmas(this, this.schemaData, h, {})

    return h('div', {
      attrs: {
        id: 'cooker-app'
      },
      on: {
        drop: this.editMode ? this.handleDrop : null,
        dragover: this.editMode ? this.handleDragover : null
      }
    }, [h(element, attribute, children)])
  },
  mounted () {
    if (this.editMode) {
      this.editModeInit('#cooker-app')
    }
  }
}
</script>

<style lang="scss" scoped>
.active-el {
  outline: 1px solid #1861d5;
}
</style>
