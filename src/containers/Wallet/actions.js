import {
  SET_BALANCE,
  SET_MARKET_PRICE,
  RESET_PRICE,
  SET_TRANSACTION_HISTORY,
  SET_CLAIMABLE_AMOUNT,
  SET_CLAIM_REQUEST,
  DISABLE_CLAIM,
  ASSETS_LABELS,
  ASSETS
} from "./constants"

import {
  getTransactionHistory,
  getClaimAmounts,
  getBalance,
  verifyAddress,
  doSendAsset
} from "neon-js"

import { getNEOPrice, getGASPrice } from "../../utils/CryptoCompareApi"

import {
  showToast
} from '../App/actions.js'

export function setBalance(data) {
  return {
    type: SET_BALANCE,
    Neo: data.NEO,
    Gas: data.GAS
  };
}

export function setMarketPrice(gasPrice, neoPrice) {
  return {
    type: SET_MARKET_PRICE,
    gas: gasPrice,
    neo: neoPrice
  };
}

export function setClaimAmount(amount) {
  return {
    type: SET_CLAIMABLE_AMOUNT,
    available: amount.available,
    unavailable: amount.unavailable
  };
}

export function disableClaim(status) {
  return {
    type: DISABLE_CLAIM,
    status
  };
}

export function setClaimRequest(status) {
  return {
    type: SET_CLAIM_REQUEST,
    status
  };
}

export function resetPrice() {
  return {
    type: RESET_PRICE
  };
}

export function setTransactionHistory(transactions) {
  return {
    type: SET_TRANSACTION_HISTORY,
    transactions
  };
}

export const validateTransactionBeforeSending = (
  neoBalance,
  gasBalance,
  selectedAsset,
  sendAddress,
  sendAmount
) => {
  if (!sendAddress || !sendAmount) {
    return {
      error: "Please specify an address and amount",
      valid: false
    };
  }

  //TODO: ASSETS_LABELS
  if (selectedAsset !== "NEO" && selectedAsset !== "GAS") {
    return {
      error: "That asset is not Neo or Gas",
      valid: false
    };
  }

  if (verifyAddress(sendAddress) !== true || sendAddress.charAt(0) !== "A") {
    return {
      error: "The address you entered was not valid.",
      valid: false
    };
  }

  if (selectedAsset === ASSETS.NEO) {
    if (parseFloat(sendAmount) !== parseInt(sendAmount)) {
      // check for fractional neo
      return {
        error: "You cannot send fractional amounts of Neo.",
        valid: false
      };
    }
    if (parseInt(sendAmount) > neoBalance) {
      // check for value greater than account balance
      return {
        error: "You do not have enough NEO to send.",
        valid: false
      };
    }
  } else if (selectedAsset === ASSETS.GAS) {
    if (parseFloat(sendAmount) > gasBalance) {
      return {
        error: "You do not have enough GAS to send.",
        valid: false
      };
    }
  }

  if (parseFloat(sendAmount) < 0) {
    // check for negative asset
    return {
      error: "You cannot send negative amounts of an asset.",
      valid: false
    };
  }

  return {
    error: "",
    valid: true
  };
};

export const sendTransaction = (sendAddress, sendAmount, asset = 'GAS') => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const state = getState()
      const wif = state.account.wif
      const net = state.app.net
      const neo = state.wallet.Neo.balance
      const gas = state.wallet.Gas.balance
      const selectedAsset = asset

      const rejectTransaction = error => {
        console.log(error)
        dispatch(showToast(error))
        reject(new Error(error))
      }

      const { error, valid } = validateTransactionBeforeSending(
        neo,
        gas,
        selectedAsset,
        sendAddress,
        sendAmount
      )

      if (valid) {
        const assetName =
          selectedAsset === ASSETS_LABELS.NEO ? ASSETS.NEO : ASSETS.GAS
        let sendAsset = {}
        sendAsset[assetName] = sendAmount

        dispatch(showToast("Processing..."))

        // console.log(`
        //   NET: ${net},
        //   sendAddress: ${sendAddress},
        //   wif: ${wif},
        //   sendAsset: ${sendAsset},
        // `)

        const sendAssetFn = () => doSendAsset(net, sendAddress, wif, sendAsset)

        sendAssetFn()
          .then(response => {
            if (response.result === undefined || response.result === false) {
              rejectTransaction("Transaction failed!")
            } else {
              dispatch(showToast("Transaction complete! Your balance will automatically update when the blockchain has processed it."))
            }
            resolve()
          })
          .catch(e => {
            rejectTransaction("Transaction failed!")
          })
      } else {
        rejectTransaction(error)
      }
    })
  }
}

export function fetchTransaction(pkey, net) {
  return dispatch =>
    getTransactionHistory(net, pkey)
      .then(b => {
        return b.map(t => {
          return {
            type: t.neo_sent ? "NEO" : "GAS",
            amount: t.neo_sent ? t.NEO : t.GAS,
            txid: t.txid,
            block_index: t.block_index
          };
        });
      })
      .then(data => {
        dispatch(setTransactionHistory(data));
      });
}

export function fetchMarketPrice() {
  return dispatch =>
    Promise.all([getGASPrice(), getNEOPrice()]).then(data => {
      dispatch(setMarketPrice(data[0], data[1]));
    });
}

export function fetchBalance(pkey, net = "TestNet") {
  return dispatch =>
    getBalance(net, pkey).then(data => {
      console.log("DATA", data);
      dispatch(setBalance(data));
    });
}

export function fetchClaimAmount(pkey, net = "TestNet") {
  return dispatch =>
    getClaimAmounts(net, pkey).then(data => {
      dispatch(setClaimAmount(data));
    });
}

export function doGasClaim(net = "TestNet", wif, selfAddress, neo) {
  console.info("Sending Neo to Yourself...");
  return dispatch =>
    doSendAsset(net, selfAddress, wif, "Neo", neo).then(response => {
      if (response.result === undefined) {
        console.info("Transaction failed!");
      } else {
        console.info("Waiting for transaction to clear...");
        dispatch(setClaimRequest(true));
        dispatch(disableClaim(true));
        dispatch(fetchClaimAmount(selfAddress));
      }
    });
}
