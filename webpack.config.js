require('./src/common/babel/runtime')
const client = require('./src/webpack/client').default
const server = require('./src/webpack/server').default

module.exports = [client, server]
