import {
  SELECT_NET,
  SWITCH_NET
} from './constants'

const initialState = {
  net: 'TestNet'
}

export default function app (state = initialState, action) {
  switch (action.type) {
    case SELECT_NET:
      return {
        ...state,
        net: action.net
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
