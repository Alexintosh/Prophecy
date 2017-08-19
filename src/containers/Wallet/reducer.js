import {
  SET_TRANSACTION_HISTORY,
  SET_BALANCE
} from './constants'

const initialState = {
  Neo: 0,
  Gas: 0,
  transactions: [],
  price: '--'
}

export default function wallet (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_HISTORY:
      return {
        ...state,
        transactions: action.transactions
      }

    case SET_BALANCE:
      return {
        ...state,
        Neo: action.Neo,
        Gas: action.Gas
      }

    default:
      return state
  }
}
