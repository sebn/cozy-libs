import { createSlice } from 'redux-starter-kit'

const formSlice = createSlice({
  initialState: {},
  slice: 'form',
  reducers: {
    init(state, action) {},
  }
})

const { actions, reducer } = formSlice
export const { init } = actions
export default reducer
