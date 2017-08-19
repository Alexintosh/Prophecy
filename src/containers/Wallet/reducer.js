import {
  SET_TRANSACTION_HISTORY
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

    default:
      return state
  }
}
