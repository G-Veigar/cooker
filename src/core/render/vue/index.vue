
<script>
// eslint-disable-next-line no-unused-vars
import { extractStyle, createStyle } from './style-parser/index3.js'
import { parseEventHandle } from './event-parser/index.js'

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
    // 将schema描述对象解析为渲染函数参数
    schema2RenderParmas (schema, h, cssStyle) {
      const res = {
        tag: schema.tag,
        attribute: {
          attrs: {
            id: schema.nodeId
          },
          class: {
            root: true
          }
        }
      }
      if (!cssStyle) {
        cssStyle = {}
      }
      // 处理 style
      if (schema.style) {
        const nodeStyle = extractStyle(schema)
        cssStyle[nodeStyle.selector] = nodeStyle.styleObj
        res.attribute.style = schema.style
      }
      // 处理 eventHandles
      if (schema.eventHandles) {
        const handles = parseEventHandle(schema)
        res.attribute.on = handles.on
      }
      if (schema.text) {
        res.attribute.domProps = {
          innerText: schema.text
        }
      }
      let children = []
      if (schema.children) {
        children = schema.children.map(item => {
          const { tag, attribute, children } = this.schema2RenderParmas(item, h, cssStyle)
          return h(tag, attribute, children)
        })
      }
      res.children = children
      return res
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
    const { tag, attribute, children, cssStyle } = this.schema2RenderParmas(this.schemaData, h)
    createStyle(cssStyle)
    return h('div', {
      attrs: {
        id: 'cooker-app'
      }
    }, [h(tag, attribute, children)])
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
