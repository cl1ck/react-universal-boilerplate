var fs = require('fs')
var path = require('path')
var babelrc = fs.readFileSync(path.join(__dirname, '../../../.babelrc'))
var config = JSON.parse(babelrc)

module.exports = config
