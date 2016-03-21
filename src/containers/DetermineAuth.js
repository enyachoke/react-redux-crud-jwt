import React from 'react'
import { connect } from 'react-redux'
import { BACKEND_API } from '../redux/utils/constants'
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

export function DetermineAuth (Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      loginUserSuccess: React.PropTypes.func
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
            body: JSON.stringify({token: token})
          })
            .then((res) => {
              if (res.status === 200) {
                this.props.loginUserSuccess(token)
                this.setState({
                  loaded_if_needed: true
                })
              }
            })
        }
      } else {
        this.setState({
          loaded_if_needed: true
        })
      }
    }

    render () {
      return (
        <div>
          {this.state.loaded_if_needed
             ? <Component {...this.props}/>
             : null}
        </div>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
