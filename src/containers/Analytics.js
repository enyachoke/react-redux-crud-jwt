import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/modules/auth/auth.actions'
import Button from 'react-toolbox/lib/button';

function mapStateToProps (state) {
  return {
    isRegistering: state.auth.isRegistering,
    registerStatusText: state.auth.registerStatusText
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

class Analytics extends React.Component {
  render () {
    return (
      <div className='col-md-8'>
        <h1>Analytics</h1>
        <hr/>
        <Button label="Hello world" raised accent />
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
