
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

const changeCurrency = (value) =>{
  return{
    type: `CHANGE_CURRENCY`,
    payload: value
  }
}

export {
  fetchPairValue,
  addCurrencyValue,
  changeCurrency
}