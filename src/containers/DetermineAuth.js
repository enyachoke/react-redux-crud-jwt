import React from 'react'
import {
  connect
} from 'react-redux'
import {
  BACKEND_API
} from '../redux/utils/constants'
import * as actionCreators from '../redux/modules/auth/auth.actions'
import {
  bindActionCreators
} from 'redux'

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

export function DetermineAuth (Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      loginUserSuccess: React.PropTypes.any
    };
    componentWillMount () {
      this.checkAuth()
      this.state = {
        loaded_if_needed: false
      }
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps)
    }

    checkAuth (props = this.props) {
      if (!props.isAuthenticated) {
        let token = localStorage.getItem('token')
        if (token) {
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
            console.log(res)
            this.props.loginUserSuccess({
              token: res.auth_token,
              user: res.user
            })
            this.setState({
              loaded_if_needed: true
            })
          }).catch(function (ex) {
            console.log('parsing failed', ex)
            this.setState({
              loaded_if_needed: true
            })
          })
        }
      } else {
        this.setState({
          loaded_if_needed: true
        })
      }
    }

    render () {
      return (<div> {
        this.state.loaded_if_needed ? < Component {...this.props
        }
        /> : null
      } </div>)
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
