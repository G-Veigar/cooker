const postcss = require('postcss')
const postcssJs = require('postcss-js')
const cssnano = require('cssnano')

const style = {
  '.hehe': {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    height: 60,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    width: 120
  },
  '.van .item': {
    width: 130
  }
}

postcss([cssnano]).process(style, { parser: postcssJs }).then((result) => {
  console.log(result.css)
})
