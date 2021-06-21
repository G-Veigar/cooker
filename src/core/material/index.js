// 物料/组件列表
const materialList = [
  {
    title: '基础组件',
    components: [
      {
        name: '容器',
        tag: 'div',
        icon: 'icon-integral'
      },
      {
        name: '文本',
        tag: 'p',
        icon: 'icon-text1',
        props: [
          {
            name: '文本内容',
            type: 'text',
            propName: 'text',
            rules: {
              required: true
            }
          }
        ]
      },
      {
        name: '链接',
        tag: 'a',
        icon: 'icon-attachent'
      },
      {
        name: '图片',
        tag: 'img',
        icon: 'icon-pic',
        props: [
          {
            name: '图片链接',
            type: 'text',
            propName: 'props.src',
            default: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2585703979,2276875278&fm=26&gp=0.jpg',
            rules: {
              required: true
            }
          }
        ]
      },
      {
        name: '按钮',
        tag: 'button',
        icon: 'icon-anniu',
        props: [
          {
            name: '按钮文案',
            type: 'text',
            propName: 'text',
            suggest: ['取消', '我知道了', '确认', '点击领取'], // 根据用户使用习惯推荐
            default: '确定',
            rules: {
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    title: '高级组件',
    components: [
      {
        name: '容器2',
        tag: 'div2',
        icon: 'icon-integral'
      }
    ]
  },
  {
    title: '自定义组件',
    components: [
      {
        name: '容器2',
        tag: 'div2',
        icon: 'icon-integral'
      }
    ]
  }
]

// 物料icon映射map
const materialIconMap = {
  page: {
    name: '页面',
    icon: 'icon-page'
  }
}
// 物料props映射map
const materialPropsMap = {}

materialList.forEach(materialGroup => {
  materialGroup.components.forEach(component => {
    materialIconMap[component.tag] = {
      icon: component.icon,
      name: component.name
    }
    materialPropsMap[component.tag] = component.props
  })
})

export {
  materialList,
  materialIconMap,
  materialPropsMap
}
