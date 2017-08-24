import axios from 'axios'

// https://min-api.cryptocompare.com/data/histohour?fsym=NEO&tsym=USD&limit=60&aggregate=3&e=CCCAGG
export const getHistohour = (net) => {
  return axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=NEO&tsym=USD&limit=60&aggregate=3&e=CCCAGG').then((response) => {
    return response.data.node
  })
}

/**
 * @function
 * @description
 * Hit the coinmarketcap api ticket to fetch the latest USD to NEO price
 *
 * @param {number} fiat - The current NEO amount in wallet
 * @return {string} - The converted NEO to USD fiat amount
 */
export const getNEOPrice = (fiat = 'USD') => {
  return axios.get(`https://api.coinmarketcap.com/v1/ticker/NEO/?convert=${fiat}`).then((response) => {
    let lastUSDNEO = Number(response.data[0].price_usd)
    return lastUSDNEO
  })
}

/**
 * @function
 * @description
 * Hit the coinmarketcap api ticket to fetch the latest USD to NEO price
 *
 * @param {number} fiat - The current NEO amount in wallet
 * @return {string} - The converted NEO to USD fiat amount
 */
export const getGASPrice = (fiat = 'USD') => {
  return axios.get(`https://api.coinmarketcap.com/v1/ticker/GAS/?convert=${fiat}`).then((response) => {
    let lastUSDNEO = Number(response.data[0].price_usd)
    return lastUSDNEO
  })
}

export const coin2FIAT = (neoAmount, value, fiatSymbol = '$ ') => {
  return (fiatSymbol + (value * neoAmount).toFixed(2).toString())
}
