import { createSlice } from 'redux-starter-kit'

const templateSlice = createSlice({
  initialState: {},
  slice: 'template',
  reducers: {
    init(state, action) {},
  }
})

const { actions, reducer } = templateSlice
export const { init } = actions
export default reducer
