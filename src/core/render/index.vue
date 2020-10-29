
<script>
// eslint-disable-next-line no-unused-vars
import { styleCreater, styleParser } from './style-parser/index.js'

export default {
  data () {
    return {
      editorSchema: {}
    }
  },
  props: {
    schema: { // json描述
      type: Object,
      require: true
    },
    editModel: { // 编辑模式
      type: Boolean,
      default: true
    }
  },
  computed: {
    schemaData () {
      return this.editModel ? this.editorSchema : this.schema
    }
  },
  methods: {
    // 将schema描述对象解析为渲染函数参数
    schema2RenderParmas (schema, h, cssStyle) {
      if (!cssStyle) {
        cssStyle = {}
      }
      const tag = schema.tag
      const attribute = {
        attrs: {
          id: schema.nodeId
        },
        class: {
          root: true
        }
      }
      // 处理 style
      if (schema.style) {
        cssStyle = styleParser(schema.style, cssStyle)
      }
      if (schema.text) {
        attribute.domProps = {
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
      return {
        tag,
        attribute,
        children,
        cssStyle
      }
    },
    editModelInit (el) {
      // 兼容来自编辑器的数据
      window.addEventListener('message', e => {
        const { type, data } = e.data
        if (type === 'schema') {
          this.editorSchema = data
        }
      }, false)
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
    console.log('cssStyle', cssStyle)
    return h('div', {
      attrs: {
        id: 'cooker-app'
      }
    }, [h(tag, attribute, children)])
  },
  mounted () {
    if (this.editModel) {
      this.editModelInit('#cooker-app')
    }
  }
}
</script>

<style lang="scss" scoped>
.active-el {
  outline: 1px solid #1861d5;
}
</style>
