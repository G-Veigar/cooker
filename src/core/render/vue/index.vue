
<script>
// eslint-disable-next-line no-unused-vars
// import { extractStyle, createStyle } from './style-parser/index3.js'
// import { parseEventHandle } from './event-parser/index.js'
import { schema2RenderParmas } from './utils.js'

export default {
  data () {
    return {
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
    }
  },
  computed: {
    schemaData () {
      return this.schema
    }
  },
  methods: {
    handleDragover (e) {
      e.preventDefault()
      // console.log('handleDragover', e)
    },
    handleDrop (e) {
      e.preventDefault()
      const label = e.dataTransfer.getData('label')
      const data = JSON.parse(label)
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
          this.activeEl && (this.activeEl.style.outline = '')
          activeEl.style.outline = '1px solid #1861d5'
          this.activeEl = activeEl
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
    const { element, attribute, children } = schema2RenderParmas(this.schemaData, h, {})

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
