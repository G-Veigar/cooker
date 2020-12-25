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
        icon: 'icon-text1'
      },
      {
        name: '链接',
        tag: 'a',
        icon: 'icon-attachent'
      },
      {
        name: '图片',
        tag: 'img',
        icon: 'icon-pic'
      },
      {
        name: '按钮',
        tag: 'button',
        icon: 'icon-anniu',
        props: [
          {
            name: '按钮文案',
            type: 'text',
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
  }
]

const materialIconMap = {}

materialList.forEach(materialGroup => {
  materialGroup.components.forEach(component => {
    materialIconMap[component.tag] = {
      icon: component.icon,
      name: component.name
    }
  })
})

export {
  materialList,
  materialIconMap
}
