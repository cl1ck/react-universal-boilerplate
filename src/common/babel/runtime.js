require('babel-regenerator-runtime')
const config = require('./babelrc')

require('babel-core/register')(config)
