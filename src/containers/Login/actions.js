import { LOGIN_REQ, LOGIN_HIDE_ERROR, LOGIN_PUBLIC, FETCH_STORAGE_PUBLIC_KEYS } from './constants'

export function login (wif) {
  return {
    type: LOGIN_REQ,
    wif
  }
}

export function getCachedPKeys () {
  return {
    type: FETCH_STORAGE_PUBLIC_KEYS
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
