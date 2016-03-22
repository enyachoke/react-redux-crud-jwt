import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/modules/auth/auth.actions'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Paper from 'material-ui/lib/paper'

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

  render () {
    return (
      <div className='col-md-6 col-md-offset-3' onKeyPress={this._handleKeyPress}>
        <Paper style={style}>
          <form role='form'>
            <div className='text-center'>
              <h2>Login to view protected content!</h2>
              {this.props.statusText &&
                <div className='alert alert-info'>
                  {this.props.statusText}
                </div>}
              <TextField
                hintText='Username'
                floatingLabelText='Username'
                type='username'
                errorText={this.state.username_error_text}
                onChange={this.getUserNameValue} /><br/>
              <TextField
                hintText='Password'
                floatingLabelText='Password'
                type='password'
                errorText={this.state.password_error_text}
                onChange={this.getPasswordValue} /><br/>
              <RaisedButton
                style={{'marginTop': 50}}
                label='Submit'
                onClick={this.login} />
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
