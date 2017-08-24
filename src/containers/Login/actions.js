import { LOGIN_REQ, LOGIN_HIDE_ERROR, LOGIN_PUBLIC } from './constants'

export function login (wif) {
  return {
    type: LOGIN_REQ,
    wif
  }
}

export function publicLogin (pkey) {
  return {
    type: LOGIN_PUBLIC,
    pkey
  }
}

export function hideError () {
  return {
    type: LOGIN_HIDE_ERROR
  }
}
