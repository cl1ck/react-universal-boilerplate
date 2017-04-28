import immutable from 'immutable'

export const ADD_IGNORES = '$FX/ADD_IGNORES'
export const REMOVE_IGNORES = '$FX/REMOVE_IGNORES'

const initialState = immutable.Map()

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_IGNORES:
      return state.withMutations(ignoreState => {
        action.payload.forEach(fx => {
          ignoreState.update(fx, (count = 0) => count + 1)
        })
      })
    case REMOVE_IGNORES:
      return state.withMutations(ignoreState => {
        action.payload.forEach(fx => {
          if (ignoreState.get(fx) === 1) {
            ignoreState.delete(fx)
          } else {
            ignoreState.update(fx, count => count - 1)
          }
        })
      })
    default:
      return state
  }
}

export const addIgnores = actions => ({
  type: ADD_IGNORES,
  payload: actions
})

export const removeIgnores = actions => ({
  type: REMOVE_IGNORES,
  payload: actions
})
