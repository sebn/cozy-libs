import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Context from './redux/context'

class ProcedurePage extends React.Component {
  render () {
    console.log(this.props.reduxState)
    return <div>page</div>
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps, null, null, { context: Context })(ProcedurePage)
