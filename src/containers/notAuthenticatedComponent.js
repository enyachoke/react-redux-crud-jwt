import React from 'react'
import {
  connect
} from 'react-redux'
import * as actionCreators from '../redux/modules/auth/auth.actions'
import {
  bindActionCreators
} from 'redux'
import {
  BACKEND_API
} from '../redux/utils/constants'
import {
  browserHistory
} from 'react-router'

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

export function requireNoAuthentication (Component) {
  class notAuthenticatedComponent extends React.Component {
    static propTypes = {
      loginUserSuccess: React.PropTypes.any,
      isAuthenticated: React.PropTypes.any
    };
    constructor (props) {
      super(props)
      this.state = {
        loaded: false
      }
    }

    componentWillMount () {
      this.checkAuth()
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps)
    }

    checkAuth (props = this.props) {
      if (props.isAuthenticated) {
        browserHistory.push('/main')
      } else {
        let token = localStorage.getItem('token')
        if (token && token !== undefined) {
          return fetch(BACKEND_API + '/users/validate_token', {
            method: 'post',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              token: token
            })
          }).then(function (response) {
            return response.json()
          }).then((res) => {
            this.props.loginUserSuccess({
              token: res.auth_token,
              user: res.user
            })
            browserHistory.push('/')
          }).catch(function (ex) {
            console.log('parsing failed', ex)
            this.setState({
              loaded: true
            })
          })
        } else {
          this.setState({
            loaded: true
          })
        }
      }
    }

    render () {
      return (<div> {!this.props.isAuthenticated && this.state.loaded ? < Component {...this.props
        }
        /> : null
      } < /div>)
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent)
}
