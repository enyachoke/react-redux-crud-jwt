import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/modules/auth/auth.actions'
import { bindActionCreators } from 'redux'

function mapStateToProps (state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

class Settings extends Component {
  render () {
    return (
      <div className='col-md-8'>
        <h1>Not Found</h1>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
