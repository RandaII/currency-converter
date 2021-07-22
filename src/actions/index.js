
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

const addCurrenciesValues = (values) =>{
  return{
    type: `ADD_CURRENCIES_VALUES`,
    payload: values
  }
}

const changeCurrency = (value) =>{
  return{
    type: `CHANGE_CURRENCY`,
    payload: value
  }
}

const choicesCurrencyInTable = (value) =>{
  return{
    type: `CHOICES_CURRENCY_IN_TABLE`,
    payload: value
  }
}

export {
  fetchPairValue,
  addCurrencyValue,
  changeCurrency,
  addCurrenciesValues,
  choicesCurrencyInTable
}