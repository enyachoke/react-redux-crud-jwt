require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')
import 'babel-polyfill'
import 'styles/vendor/roboto/scss/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import configureStore from './redux/store/configureStore'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'style.scss'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

injectTapEventPlugin()
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
    document.getElementById('root')
)
