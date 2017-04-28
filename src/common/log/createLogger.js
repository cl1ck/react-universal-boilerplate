if (typeof __BROWSER__ !== 'undefined' && __BROWSER__) {
  module.exports = require('./createClientLogger')
} else {
  module.exports = require('./createServerLogger')
}
