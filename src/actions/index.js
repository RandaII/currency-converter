
const fetchPairValue = (newCurrencyPair) =>{
  return{
    type: `FETCH_PAIR_VALUE`,
    payload: newCurrencyPair
  }
}

const addCurrencyValue = (value) =>{
  return{
    type: `ADD_CURRENCY_VALUE`,
    payload: value
  }
}

export {
  fetchPairValue,
  addCurrencyValue
}