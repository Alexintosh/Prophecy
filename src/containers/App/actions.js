import {SWITCH_NET} from './constants'

export function switchNet (currentNet) {
  return {
    type: SWITCH_NET,
    net: currentNet
  }
}
