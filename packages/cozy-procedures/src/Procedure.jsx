import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import ProcedurePage from './ProcedurePage'
import store from './redux/store'

class Procedure extends React.Component {
  render () {
    return(
      <div>
        <h1>procedure</h1>
        <ProcedurePage />
      </div>
    )
  }
}

const ProcedureWithStore = () => (
  <Provider store={store}>
    <Procedure />
  </Provider>
)

export default ProcedureWithStore
