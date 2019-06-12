import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './common/App'
import client from './common/client'
// import Comp from 'cozy-procedures'
import Comp from '../../cozy-procedures/dist'

const reducer = combineReducers({
  cozy: client.reducer()
})

const store = createStore(reducer)

const Procedure = () => {
  return (
    <div>
      <Comp />
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App client={client} existingStore={store}>
      <Route path="/" component={Procedure} />
    </App>
  </Provider>,
  document.querySelector('#app')
)