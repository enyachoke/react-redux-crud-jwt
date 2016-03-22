/* @flow */
import { checkFetchStatus } from '../../utils/checkFetchStatus'
import { BACKEND_API } from '../../utils/constants'
import _            from 'lodash'
import axios        from 'axios'
import bows         from 'bows'
import reduxCrud    from 'redux-crud'
import cuid         from 'cuid'

import actionTypes  from './actionTypes'

const baseActionCreators = reduxCrud.actionCreatorsFor('clients')
const log  = bows('clients--actions')
const url = BACKEND_API + '/clients'
let actionCreators = {

  fetch() {
    return function(dispatch, getState) {
      let token = getState().auth.token
      const action = baseActionCreators.fetchStart()
      dispatch(action)
      const promise = axios({
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      promise.then(function(response) {
          // dispatch the success action
          const returned = response.data
          const successAction = baseActionCreators.fetchSuccess(returned)
          dispatch(successAction)
        }, function(response) {
          // log(response)
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.fetchError(response)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

  create(client) {
    return function(dispatch,getState) {
      let token = getState().auth.token
      const cid = cuid()
      client = client.merge({id: cid})
      // log('client', client)
      const optimisticAction = baseActionCreators.createStart(client)
      dispatch(optimisticAction)
      const promise = axios({
        url: url,
        method: 'POST',
        data: {client:client},
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      promise.then(function(response) {
          // dispatch the success action
          const returned = response.data
          const successAction = baseActionCreators.createSuccess(returned, cid)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.createError(response, client)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise

    }
  },

  update(client) {
    return function(dispatch,getState) {
      let token = getState().auth.token
      const optimisticAction = baseActionCreators.updateStart(client)
      dispatch(optimisticAction)
      const promise = axios({
        url: url + `/${client.id}`,
        method: 'PATCH',
        data: client,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      promise.then(function(response) {
          // dispatch the success action
          const returned = response.data
          const successAction = baseActionCreators.updateSuccess(returned)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.updateError(response, client)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise

    }
  },

  delete(client) {
    return function(dispatch,getState) {
      let token = getState().auth.token
      const optimisticAction = baseActionCreators.deleteStart(client)
      dispatch(optimisticAction)

      const promise = axios({
        url: url + `/${client.id}`,
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      promise.then(function(response) {
          // dispatch the success action
          const successAction = baseActionCreators.deleteSuccess(client)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.deleteError(response, client)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

}

actionCreators = _.extend(actionCreators, baseActionCreators)

export default actionCreators
