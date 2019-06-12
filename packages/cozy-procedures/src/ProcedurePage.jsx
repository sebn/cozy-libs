import React from 'react'
import PropTypes from 'prop-types'
import IdentityInput from './IdentityInput'
import get from 'lodash/get'
import { connect } from 'react-redux'
import Context from './redux/context'

class ProcedurePage extends React.Component {
  render () {
    const { identityFields } = this.props
    return <div>
      {identityFields.map(field => (
        <IdentityInput key={field.id} field={field} />
      ))}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    identityFields: get(state, 'template.identity', [])
  }
}

export default connect(mapStateToProps, null, null, { context: Context })(ProcedurePage)
