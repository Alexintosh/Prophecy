import { LOGIN_REQ, LOGIN_HIDE_ERROR } from './constants'

export function login (wif) {
  return {
    type: LOGIN_REQ,
    wif
  }
}

export function hideError () {
  return {
    type: LOGIN_HIDE_ERROR
  }
}
