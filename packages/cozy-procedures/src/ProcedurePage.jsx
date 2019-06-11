import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

export default connect(mapStateToProps)(ProcedurePage)
