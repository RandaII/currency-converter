
const fetchPairValue = (newCurrencyPair) =>{
  return{
    type: `FETCH_PAIR_VALUE`,
    payload: newCurrencyPair
  }
}

export {
  fetchPairValue
}