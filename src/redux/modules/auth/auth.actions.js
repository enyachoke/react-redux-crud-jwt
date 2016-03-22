import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGOUT_USER } from './auth.constants'
import { parseJSON } from '../../utils/misc'
import { browserHistory } from 'react-router'
import { getToken } from './auth.http'

export function loginUserSuccess (payload) {
  localStorage.setItem('token', payload.token)
  return {
    type: LOGIN_USER_SUCCESS,
    payload}
}

export function loginUserFailure (error) {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.status,
      statusText: error.statusText
    }
  }
}

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout () {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect () {
  return (dispatch, state) => {
    dispatch(logout())
    browserHistory.push('/login')
  }
}

export function redirectToRoute (route) {
  return (dispatch) => {
    browserHistory.push(route)
  }
}

export function loginUser (email, password, redirect = '/') {
  return function (dispatch) {
    dispatch(loginUserRequest())
    return getToken(email, password)
      .then(parseJSON)
      .then((response) => {
        try {
          dispatch(loginUserSuccess({token: response.auth_token, user: response.user}))
          browserHistory.push('/')
        } catch (e) {
          alert(e)
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }))
        }
      })
      .catch((error) => {
        dispatch(loginUserFailure(error))
      })
  }
}
