import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import 'onsenui'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/app'
import { Provider } from 'react-redux'
import './globalStyles'

import configureStore from './store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
