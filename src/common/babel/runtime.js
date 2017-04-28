require('babel-regenerator-runtime')
var fs = require('fs')
var path = require('path')

var babelrc = fs.readFileSync(path.join(process.cwd(), '.babelrc'))
var config = JSON.parse(babelrc)

require('babel-core/register')(config)
