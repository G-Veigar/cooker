export default {
  tag: 'span',
  original: true, // 标识是一个原生标签
  name: '文本', // 组件名，显示在组件市场中
  icon: 'icon-integral', // 组件icon，显示在组件市场中
  config: {
    props: [
      {
        name: 'innerText',
        type: 'string',
        default: '请输入文本内容',
        required: true
      }
    ],
    style: [
      {
        name: 'boxModelStyleGroup'
      },
      {
        name: 'fontStyleGroup',
        default: {
          color: '#333'
        }
      },
      {
        name: 'positionStyleGroup'
      },
      {
        name: 'backgroundStyleGroup'
      }
    ]
  }
}
