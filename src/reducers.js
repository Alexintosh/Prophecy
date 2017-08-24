/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import {combineReducers} from 'redux'
import account from './containers/Login/reducer'
import wallet from './containers/Wallet/reducer'
import app from './containers/App/reducer'
/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer () {
  return combineReducers({
    account,
    wallet,
    app
  })
}
