import { createSlice } from 'redux-starter-kit'
import get from 'lodash/get'
import set from 'lodash/set'

const formSlice = createSlice({
  initialState: {
    identity: {},
    documents: {},
    amount: null,
    duration: null,
  },
  slice: 'form',
  reducers: {
    init: (state, action) => {
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
    setValue: (state, action) => {
      set(state, `${action.payload.section}.${action.payload.fieldId}`, action.payload.value)
      return state
    }
  }
})

const { actions, reducer } = formSlice
export const { init, setValue } = actions
export default reducer
