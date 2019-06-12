import { createSlice } from 'redux-starter-kit'

const templateSlice = createSlice({
  initialState: null,
  slice: 'template',
  reducers: {
    init(state, action) {
      return action.payload
    },
  }
})

const { actions, reducer } = templateSlice
export const { init } = actions
export default reducer
