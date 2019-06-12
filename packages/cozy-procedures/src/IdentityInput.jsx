import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Context from './redux/context'
import { setValue as setFormValue } from './redux/formSlice'

class IdentityInput extends React.Component {
  render () {
    const { field, value, setFormValue } = this.props
    return <label>
      {field.label}:
      <input type="text" id={field.id} value={value} onChange={e => setFormValue(e.target.value)} />
    </label>
  }
}

const mapStateToProps = (state, ownProps) => ({
  value: get(state, `form.identity.${ownProps.field.id}.value`)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFormValue: (value) => dispatch(setFormValue({ section: 'identity', fieldId: ownProps.field.id, value }))
})

export default connect(mapStateToProps, mapDispatchToProps, null, { context: Context })(IdentityInput)
