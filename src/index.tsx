import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import store from './redux/store'
import routes from './routes'


import 'normalize.css'
import './assets/fonts/OpenSans/stylesheet.css'
import './assets/main.css'

const history = syncHistoryWithStore(browserHistory, store)

ReactDom.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
