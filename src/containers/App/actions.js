import {
  SWITCH_NET,
  SHOW_TOAST,
  HIDE_TOAST
} from './constants'

export function switchNet (currentNet) {
  return {
    type: SWITCH_NET,
    net: currentNet
  }
}

export function showToast (message) {
  return {
    type: SHOW_TOAST,
    message
  }
}

export function hideToast () {
  return {
    type: HIDE_TOAST
  }
}
