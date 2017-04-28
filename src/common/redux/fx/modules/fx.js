import immutable from 'immutable'

export const ADD_FX = '$FX/ADD_FX'
export const REMOVE_FX = '$FX/REMOVE_FX'

const initialState = immutable.Map()

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_FX:
      return state.withMutations(fxState => {
        action.payload.forEach(fx => {
          fxState.update(fx, (count = 0) => count + 1)
        })
      })
    case REMOVE_FX:
      return state.withMutations(fxState => {
        action.payload.forEach(fx => {
          if (fxState.get(fx) === 1) {
            fxState.delete(fx)
          } else {
            fxState.update(fx, count => count - 1)
          }
        })
      })
    default:
      return state
  }
}

export const addActions = actions => ({
  type: ADD_FX,
  payload: actions
})

export const removeActions = actions => ({
  type: REMOVE_FX,
  payload: actions
})
