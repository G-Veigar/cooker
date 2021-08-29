import { createStyleElement } from './utils'
import * as postcss from 'postcss'
import * as postcssJs from 'postcss-js'
// import cssnano from 'cssnano'

function extractStyle (node) {
  if (node.style) {
    const cssSelector = `#node-${node.nodeId}`
    return {
      selector: cssSelector,
      styleObj: node.style
    }
  }
}

function createStyle (styleObj) {
  postcss([])
    .process(styleObj, { parser: postcssJs })
    .then((result) => {
      console.log('result.css', result.css)
      createStyleElement(result.css)
    })
}

export { extractStyle, createStyle }
