import { LOGGED_IN, LOGGED_OUT } from './constants'

export function login (wif) {
  return {
    type: LOGGED_IN,
    wif: wif
  }
}

export function logout () {
  return {
    type: LOGGED_OUT
  }
}
