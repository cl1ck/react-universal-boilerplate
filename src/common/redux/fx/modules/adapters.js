import immutable from 'immutable'

export const ADD_ADAPTER = '$FX/ADD_ADAPTER'
export const REMOVE_ADAPTER = '$FX/REMOVE_ADAPTER'

const initialState = immutable.Map()

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ADAPTER: {
      const { from, to } = action.payload
      return state.updateIn([from, to], (x = 0) => x + 1)
    }
    case REMOVE_ADAPTER: {
      const { from, to } = action.payload
      return state
        .updateIn([from, to], count => count - 1)
        .update(from, targets => targets.filter(count => count > 0))
        .filter(sources => sources.size !== 0)
    }
    default:
      return state
  }
}

export const addAdapter = (from, to) => ({
  type: ADD_ADAPTER,
  payload: { from, to }
})

export const removeAdapter = (from, to) => ({
  type: REMOVE_ADAPTER,
  payload: { from, to }
})
