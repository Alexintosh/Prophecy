import {
  SET_BALANCE,
  SET_MARKET_PRICE,
  RESET_PRICE,
  SET_TRANSACTION_HISTORY,
  SET_CLAIMABLE_AMOUNT,
  SET_CLAIM_REQUEST,
  DISABLE_CLAIM
} from './constants'

import {
  getTransactionHistory,
  getClaimAmounts,
  getBalance,
  doSendAsset
} from 'neon-js'

import {
  getNEOPrice,
  getGASPrice
} from '../../utils/CryptoCompareApi'

export function setBalance (data) {
  return {
    type: SET_BALANCE,
    Neo: data.Neo,
    Gas: data.Gas
  }
}

export function setMarketPrice (gasPrice, neoPrice) {
  return {
    type: SET_MARKET_PRICE,
    gas: gasPrice,
    neo: neoPrice
  }
}

export function setClaimAmount (amount) {
  return {
    type: SET_CLAIMABLE_AMOUNT,
    available: amount.available,
    unavailable: amount.unavailable
  }
}

export function disableClaim (status) {
  return {
    type: DISABLE_CLAIM,
    status
  }
};

export function setClaimRequest (status) {
  return {
    type: SET_CLAIM_REQUEST,
    status
  }
};

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
}

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

export function fetchMarketPrice (pkey) {
  return (dispatch) => Promise.all([
    getGASPrice(),
    getNEOPrice()
  ]).then((data) => {
    dispatch(setMarketPrice(data[0], data[1]))
  })
}

export function fetchBalance (pkey, net = 'TestNet') {
  return (dispatch) => getBalance(net, pkey)
    .then((data) => {
      dispatch(setBalance(data))
    })
}

export function fetchClaimAmount (pkey, net = 'TestNet') {
  return (dispatch) => getClaimAmounts(net, pkey)
    .then((data) => {
      dispatch(setClaimAmount(data))
    })
}

export function doGasClaim (net = 'TestNet', wif, selfAddress, neo) {
  console.log('Sending Neo to Yourself...')
  return (dispatch) => doSendAsset(net, selfAddress, wif, 'Neo', neo)
  .then((response) => {
    if (response.result === undefined) {
      console.log('Transaction failed!')
    } else {
      console.log('Waiting for transaction to clear...')
      dispatch(setClaimRequest(true))
      dispatch(disableClaim(true))
      dispatch(fetchClaimAmount(selfAddress))
    }
  })
}
