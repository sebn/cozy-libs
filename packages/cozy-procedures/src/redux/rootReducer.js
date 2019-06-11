import { combineReducers } from 'redux'
import templateSlice from './templateSlice'
import formSlice from './formSlice'

const rootReducer = combineReducers({
  template: templateSlice,
  form: formSlice
})

export default rootReducer
