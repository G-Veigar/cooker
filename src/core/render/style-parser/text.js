// text: { // 字体文本相关
//   color: '#aaa',
//   size: 16,
//   fontFamily: '',
//   fontWeight: '',
//   lineHeight: 20,
//   textAlign: 'left', // left center right justify,
//   isItalic: false, // 是否倾斜
//   shadow: {
//     hShadow: 0,
//     vShadow: 0,
//     blur: 0,
//     color: ''
//   },
//   overflow: '', // clip|ellipsis|string;
//   wordWrap: 'normal|break-word',
//   verticalAlign: '' // baseline, top, middle, bottom
// },
import { toMapName } from '../style-parser/utils'

const cssNameMap = {
  color: 'color',
  overflow: 'overflow',
  size: 'font-size',
  fontFamily: 'font-family',
  fontWeight: 'font-weight',
  lineHeight: 'line-height',
  textAlign: 'text-aligin',
  wordWrap: 'word-wrap',
  verticalAlign: 'vertical-align'
}

function textStyleParser (textStyle) {
  const cssTextStyle = {}
  toMapName(textStyle, cssTextStyle, cssNameMap)
  if (textStyle.shadow) {
    cssTextStyle['text-shadow'] = textShadowStringify(textStyle.shadow)
  }
  return cssTextStyle
}

// TODO: 非必填项目为空处理
function textShadowStringify (shadowStyle) {
  const { hShadow, vShadow, blur, color } = shadowStyle
  return `${hShadow} ${vShadow} ${blur} ${color}`
}

export default textStyleParser
