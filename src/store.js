/**
 * Create the store with asynchronously loaded reducers
 */

import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createReducer from './reducers'

export default function configureStore (initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    thunkMiddleware
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    composeEnhancers(...enhancers)
  )

  return store
}
