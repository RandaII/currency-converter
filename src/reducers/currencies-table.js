const initialState = {
  values:{},
  currentCurrency: `USD`,
  dataType: `currency-table-item`,
  activeStatus: false,
  isLoading: true,
  error: {
    status: false,
    message: null
  }
}

const updateCurrenciesTable = (state = initialState, action) => {
  switch (action.type) {
    // добавить значения валют
    case `ADD_CURRENCIES_VALUES`:
      return {
        ...state,
        values: action.payload
      }
    // установить валюту
    case `SET_CURRENCY_IN_TABLE`:
      return {
        ...state,
        currentCurrency: action.payload
      }
    // назначить activeStatus/isLoading/error
    case `SET_TABLE_STATUSES`:
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}

export default updateCurrenciesTable;