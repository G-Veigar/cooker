// 物料/组件列表
const materialList = [
  {
    title: '基础组件',
    components: [
      {
        name: '容器',
        component: 'div',
        icon: 'icon-integral'
      },
      {
        name: '文本',
        component: 'p',
        icon: 'icon-text1'
      },
      {
        name: '链接',
        component: 'a',
        icon: 'icon-attachent'
      },
      {
        name: '图片',
        component: 'img',
        icon: 'icon-pic'
      },
      {
        name: '按钮',
        component: 'img',
        icon: 'icon-anniu'
      }
    ]
  },
  {
    title: '高级组件',
    components: [
      {
        name: '容器2',
        component: 'div2',
        icon: 'icon-integral'
      }
    ]
  }
]

const materialIconMap = {}

materialList.forEach(materialGroup => {
  materialGroup.components.forEach(component => {
    materialIconMap[component.component] = {
      icon: component.icon,
      name: component.name
    }
  })
})

export {
  materialList,
  materialIconMap
}
