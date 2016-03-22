import { createReducer } from '../../utils/misc'
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGOUT_USER } from './auth.constants'

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'userName': payload.user.username,
      'statusText': 'You have been successfully logged in.'
    })
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    })
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': 'You have been successfully logged out.'
    })
  }
})
