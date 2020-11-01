// {
//   tag: 'div',
//   type: 'element', // element: 原生标签
//   nodeId: '100',
//   style: {},
//   eventHandls: {
//     click: {
//       once: false,
//       capture: false,
//       passive: false, // 滚动事件加入
//       decorator: [
//         {
//           name: 'debounce',
//           params: [500]
//         }
//       ],
//       handle () {
//         console.log('clicked!')
//       }
//     }
//   }
// }
// TODO: nativeOn兼容
function parseEventHandle (schemaNode) {
  const res = {
    on: {},
    nativeOn: {}
  }
  const eventHandls = schemaNode.eventHandls
  for (const event in eventHandls) {
    res.on[event] = eventHandls[event].handle
  }
  return res
}

export { parseEventHandle }
