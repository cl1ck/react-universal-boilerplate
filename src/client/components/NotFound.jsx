import React, {Component} from 'react'
import PropTypes from 'prop-types'

class NotFound extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext () {
    if (!this.context.router) {
      this.context.router = {}
    }
    if (!this.context.router.staticContext) {
      this.context.router.staticContext = {}
    }
    this.context.router.staticContext.status = 404
    return this.context
  }

  render () {
    return <h1>404 - Not found</h1>
  }
}

export default NotFound
