import { SET_BALANCE, SET_MARKET_PRICE, RESET_PRICE, SET_TRANSACTION_HISTORY } from './constants'
import { getTransactionHistory } from 'neon-js'

export function setBalance (neo, gas, price) {
  return {
    type: SET_BALANCE,
    Neo: neo,
    Gas: gas,
    price: price
  }
}

export function setMarketPrice (price) {
  return {
    type: SET_MARKET_PRICE,
    price: price
  }
}

export function resetPrice () {
  return {
    type: RESET_PRICE
  }
}

export function setTransactionHistory (transactions) {
  return {
    type: SET_TRANSACTION_HISTORY,
    transactions
  }
};

export function fetchTransaction (pkey) {
  return (dispatch) => getTransactionHistory('TestNet', pkey).then(b => {
    return b.map(t => {
      return {
        type: t.neo_sent ? 'NEO' : 'GAS',
        amount: t.neo_sent ? t.NEO : t.GAS,
        txid: t.txid,
        block_index: t.block_index
      }
    })
  }).then((data) => {
    dispatch(setTransactionHistory(data))
  })
}
