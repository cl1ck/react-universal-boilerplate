import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addIgnores, removeIgnores } from 'common/redux/fx/modules/ignores'

class FXIgnore extends Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.dispatch(addIgnores(this.props.actions))
  }

  componentDidUpdate (prevProps) {
    this.props.dispatch(removeIgnores(prevProps.actions))
    this.props.dispatch(addIgnores(this.props.actions))
  }

  componentWillUnmount () {
    this.props.dispatch(removeIgnores(this.props.actions))
  }

  render () {
    return null
  }
}

export default connect()(FXIgnore)
