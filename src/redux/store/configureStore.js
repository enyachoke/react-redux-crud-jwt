import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../rootReducer'

const debugware = []
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger')
  debugware.push(createLogger({
    collapsed: true
  }))
}

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, ...debugware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
