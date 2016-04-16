import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/modules/auth/auth.actions'
import Input from 'react-toolbox/lib/input';
import {Button, IconButton} from 'react-toolbox/lib/button';
function mapStateToProps (state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: '100%',
  textAlign: 'center',
  display: 'inline-block'
}

class LoginView extends React.Component {
  static propTypes = {
    loginUser: React.PropTypes.any,
    statusText: React.PropTypes.any
  };
  constructor (props) {
    super(props)
    const redirectRoute = '/login'
    this.state = {
      username: '',
      password: '',
      username_error_text: null,
      password_error_text: null,
      redirectTo: redirectRoute,
      disabled: true
    }
  }
  getUserNameValue = (e) => {
    const value = e.target.value
    const next_state = {}
    next_state['username'] = value
    this.setState(next_state, () => {
    })
  }

  getPasswordValue = (e) => {
    const value = e.target.value
    const next_state = {}
    next_state['password'] = value
    this.setState(next_state, () => {
    })
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.login(e)
    }
  }

  login = (e) => {
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password, this.state.redirectTo)
  }
  handleChange = (name, value) => {
    const next_state = {}
    next_state[name] = value
    this.setState(next_state, () => {
    })
    };
  render () {
    return (
          <form role='form'>
            <div className='text-center'>
              <h2>Login to view protected content!</h2>
              {this.props.statusText &&
                <div className='alert alert-info'>
                  {this.props.statusText}
                </div>}
              <Input type='text' label='Username' name='username'
              error={this.state.username_error_text}
              value={this.state.userName}
            onChange={this.handleChange.bind(this, 'username')} maxLength={16 } />
              <Input type='password' label='Password' name='password'
              error={this.state.password_error_text}
              onChange={this.handleChange.bind(this, 'password')} maxLength={16 } />
                <Button  onClick={this.login} label='Login' raised primary />
            </div>
          </form>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
