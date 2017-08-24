import {
  SET_TRANSACTION_HISTORY,
  SET_BALANCE,
  SET_MARKET_PRICE,
  SET_CLAIMABLE_AMOUNT,
  SET_CLAIM_REQUEST,
  DISABLE_CLAIM
} from './constants'

const initialState = {
  Neo: 0,
  Gas: 0,
  transactions: [],
  availableToClaim: 0,
  claimMetadata: {
    lastClaim: false,
    inProgress: false,
    claimWasUpdated: false,
    disabled: false
  },
  price: {
    gas: 0,
    neo: 0
  }
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

    case SET_CLAIMABLE_AMOUNT:
      let claimWasUpdated = false
      if (action.available > state.availableToClaim && state.claimMetadata.inProgress === true) {
        claimWasUpdated = true
      }

      return {
        ...state,
        availableToClaim: (action.available + action.unavailable) / 100000000,
        claimMetadata: {
          ...state.claimMetadata,
          claimWasUpdated
        }
      }

    case SET_CLAIM_REQUEST:
      return {
        ...state,
        claimMetadata: {
          ...state.claimMetadata,
          inProgress: action.status
        }
      }

    case DISABLE_CLAIM:
      return {
        ...state,
        claimMetadata: {
          ...state.claimMetadata,
          disabled: action.status
        }
      }

    case SET_MARKET_PRICE:
      return {
        ...state,
        price: {
          neo: action.neo,
          gas: action.gas
        }
      }

    default:
      return state
  }
}
