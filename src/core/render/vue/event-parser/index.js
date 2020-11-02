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
//       handle: {
//         params: null,
//         body: "console.log('hehe')"
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
  const eventHandls = schemaNode.eventHandles
  for (const event in eventHandls) {
    const handleSchema = eventHandls[event].handle
    const { params, body } = handleSchema
    const funParams = [...params, body]
    // eslint-disable-next-line no-new-func
    const handle = new Function(...funParams)
    res.on[event] = handle
    console.log('parseEventHandle', handle)
  }
  return res
}

export { parseEventHandle }
