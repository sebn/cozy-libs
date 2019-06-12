import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'

import ProcedurePage from './ProcedurePage'
import store from './redux/store'
import Context from './redux/context'
import template from './ProcedureTemplate'
import { init as initTemplate } from './redux/templateSlice'
import { init as initForm } from './redux/formSlice'

class Procedure extends React.Component {

  componentDidMount () {
    this.props.initTemplate(template)
    this.props.initForm(template)
  }

  render () {
    return(
      <div>
        <h1>procedure</h1>
        <ProcedurePage />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  initTemplate: (template) => dispatch(initTemplate(template)),
  initForm: (template) => dispatch(initForm(template)),
})

const ConnectedProcedure = connect(null, mapDispatchToProps, null, { context: Context })(Procedure)

const ProcedureWithStore = () => (
  <Provider store={store} context={Context}>
    <ConnectedProcedure />
  </Provider>
)

export default ProcedureWithStore
