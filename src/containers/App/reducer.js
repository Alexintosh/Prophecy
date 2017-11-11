import {
  SELECT_NET,
  SWITCH_NET,
  SHOW_TOAST,
  HIDE_TOAST
} from './constants'

const initialState = {
  net: 'TestNet',
  toast: {
    isShown: false,
    message: 'Welcome 😊 !'
  }
}

export default function app (state = initialState, action) {
  switch (action.type) {
    case SELECT_NET:
      return {
        ...state,
        net: action.net
      }

    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          message: action.message,
          isShown: true
        }
      }

    case HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          isShown: false
        }
      }

    case SWITCH_NET:
      return {
        ...state,
        net: action.net === 'MainNet' ? 'TestNet' : 'MainNet'
      }

    default:
      return state
  }
}
