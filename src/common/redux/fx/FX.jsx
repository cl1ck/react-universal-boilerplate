import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addActions, removeActions } from 'common/redux/fx/modules/fx'

class FX extends Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.dispatch(addActions(this.props.actions))
  }

  componentDidUpdate (prevProps) {
    this.props.dispatch(removeActions(prevProps.actions))
    this.props.dispatch(addActions(this.props.actions))
  }

  componentWillUnmount () {
    this.props.dispatch(removeActions(this.props.actions))
  }

  render () {
    return null
  }
}

export default connect()(FX)
