import { createSlice } from 'redux-starter-kit'
import get from 'lodash/get'

const formSlice = createSlice({
  initialState: {
    identity: {},
    documents: {},
    amount: null,
    duration: null,
  },
  slice: 'form',
  reducers: {
    init(state, action) {
      state.identity = get(action.payload, 'identity', []).reduce((acc, field) => {
        acc[field.id] = {
          value: undefined
        }
        return acc
      }, {})
      state.amount = get(action.payload, 'amount', 0)
      state.duration = get(action.payload, 'duration', 24)

      return state
    },
  }
})

const { actions, reducer } = formSlice
export const { init } = actions
export default reducer
