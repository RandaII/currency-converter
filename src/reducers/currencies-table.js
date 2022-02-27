const initialState = {
  values:{},
  currentCurrency: `USD`,
  dataType: `currency-table-item`
}

const updateCurrenciesTable = (state = initialState, action) => {
  switch (action.type) {
    case `ADD_CURRENCIES_VALUES`:
      return {
        ...state,
        values: action.payload
      }
    case `SET_CURRENCY_IN_TABLE`:
      return {
        ...state,
        currentCurrency: action.payload
      }
    default: return state;
  }
}

export default updateCurrenciesTable;