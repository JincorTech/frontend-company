import 'babel-polyfill'

const srcContext = require.context('./modules', true, /\.spec\.tsx?$/)
srcContext.keys().forEach(srcContext)

const utilsContext = require.context('./utils', true, /\.spec\.tsx?$/)
utilsContext.keys().forEach(utilsContext)
