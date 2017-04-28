import {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addAdapter, removeAdapter} from 'common/redux/fx/modules/adapters'

class FXAdapter extends Component {
  static propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.dispatch(addAdapter(this.props.from, this.props.to))
  }

  componentDidUpdate (prevProps) {
    this.props.dispatch(removeAdapter(prevProps.from, prevProps.to))
    this.props.dispatch(addAdapter(this.props.from, this.props.to))
  }

  componentWillUnmount () {
    this.props.dispatch(removeAdapter(this.props.from, this.props.to))
  }

  render () {
    return null
  }
}

export default connect()(FXAdapter)
