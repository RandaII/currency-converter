// payload массив из двух обменных значений валют - [current, converted]
const fetchPairValue = (payload) =>({
    type: `FETCH_PAIR_VALUE`,
    payload
});

// payload объект со свойствами type (current или converted поле) и value {type, value}
const addCurrencyValue = (payload) =>({
    type: `ADD_CURRENCY_VALUE`,
    payload
});

// payload объект со свойствами type (current или converted поле) и value (название валюты - USD и т.п.) {type, value}
const setCurrency = (value) =>({
  type: `SET_CURRENCY`,
  payload: value
});

// payload объект со свойством current или converted и булевым значением {current || converted}
const setListStatus = (payload) =>({
  type: `SET_LIST_STATUS`,
  payload
});

// payload объект c валютными парами вида: {pairName: numberValue}
const addCurrenciesValues = (payload) =>({
    type: `ADD_CURRENCIES_VALUES`,
    payload
});

// payload строка с названием валюты - USD, GBP и т.п.
const setCurrencyInTable = (payload) =>({
    type: `SET_CURRENCY_IN_TABLE`,
    payload
});

export {
  fetchPairValue,
  addCurrencyValue,
  setCurrency,
  setListStatus,
  addCurrenciesValues,
  setCurrencyInTable
}