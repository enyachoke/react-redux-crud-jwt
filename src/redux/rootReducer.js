import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import auth from './modules/auth/auth.reducer'
import clientsReducer from './modules/clients/clients.reducer'
const rootReducer = combineReducers({
  routing: router,
  /* your reducers */
  clients: clientsReducer,
  auth,
  counter
})

export default rootReducer
