import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import snake from 'to-snake-case'

@autobind
export default class Bundle {
  name
  components = {}
  actionCreators = {}
  reducers = {}
  initialState

  constructor (name, initialState) {
    this.name = name
    this.initialState = initialState
  }

  addComponent (name, Component) {
    if (name in this.components) {
      throw new Error(`Duplicate component ${name}`)
    }
    this.components[name] = Component
  }

  mapStateToProps (Container, requestedProps) {
    return state => {
      const props = {}
      if (!state.has(this.name)) {
        throw new Error(
          `State for Bundle ${this.name} is missing in global state.` +
            'Check your reducer configuration and store setup.'
        )
      }
      const localState = state.get(this.name)
      requestedProps.forEach(prop => {
        if (localState.has(prop)) {
          props[prop] = localState.get(prop)
        }
        // todo: selectors
      })
      return props
    }
  }

  mapDispatchToProps (Container, requestedProps) {
    return dispatch => () => {
      const props = {}
      requestedProps.forEach(prop => {
        if (prop in this.actionCreators) {
          props[prop] = (...params) => {
            dispatch(this.actionCreators[prop](...params))
          }
        }
      })
      return props
    }
  }

  connectContainer (Container, requestedProps) {
    return connect(
      this.mapStateToProps(Container, requestedProps),
      this.mapDispatchToProps(Container, requestedProps)
    )(Container)
  }

  addContainer (name, container, requestedProps) {
    if (name in this.components) {
      throw new Error(`Duplicate component ${name}`)
    }
    this.components[name] = this.connectContainer(container, requestedProps)
  }

  getNamespacedActionType (actionType) {
    return `${this.name}/${snake(actionType).toUpperCase()}`
  }

  addReducer (actionType, reducer) {
    if (!(actionType in this.actionCreators)) {
      throw new Error(
        `Action '${actionType}' not found!` +
          'Add it with addAction() before adding a reducer.'
      )
    }

    const bundleReducer = (state, action) => {
      if (action.meta) {
        return reducer(state, action.payload, action.meta)
      }
      return reducer(state, action.payload)
    }
    this.reducers[this.getNamespacedActionType(actionType)] = bundleReducer
  }

  addAction (actionType, actionCreator, meta) {
    if (actionType in this.actionCreators) {
      throw new Error(`Duplicate action ${actionType}`)
    }

    this.actionCreators[actionType] = (...params) => {
      const action = {
        type: this.getNamespacedActionType(actionType),
        payload: actionCreator(...params)
      }
      if (meta !== undefined) {
        action.meta = meta
      }
      return action
    }
  }

  add (actionType, reducer, actionCreator, meta) {
    this.addAction(actionType, actionCreator, meta)
    this.addReducer(actionType, reducer)
  }

  callReducer (state, action, ...additionalParameters) {
    let currentState = state

    if (state === undefined) {
      currentState = this.initialState
    }
    if (action === undefined || !this.hasReducer(action)) {
      return currentState
    }
    return this.getReducer(action)(
      currentState,
      action,
      ...additionalParameters
    )
  }

  getReducer (action) {
    return this.reducers[action.type]
  }

  hasReducer (action) {
    return action.type in this.reducers
  }

  getComponents () {
    return this.components
  }

  getName () {
    return this.name
  }

  getActionCreators () {
    return this.actionCreators
  }

  getActionCreator (actionType) {
    return this.actionCreators[actionType]
  }

  createAction (actionType, ...params) {
    return this.actionCreators[actionType](...params)
  }

  getInitialState () {
    return this.initialState
  }
}
