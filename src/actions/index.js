import CurrencyPairService from "../services/currency-pair-service";

const currencyPairService = new CurrencyPairService();

// payload массив из двух обменных значений валют - [current, converted]
const fetchPairValue = () => (dispatch, getState) =>{
  const {
    converter: {
      current: {currency: currentCurrency},
      converted: {currency: convertedCurrency}
    }
  } = getState();

  // образуем ключи текущей пары
  const pair = [currentCurrency + convertedCurrency, convertedCurrency + currentCurrency];

  // получаем курс текущей пары
  currencyPairService.getCourse(pair)
    // отправляем значение в store
    .then((payload) => dispatch({
        type: `FETCH_PAIR_VALUE`,
        payload
      })
    )
    .catch((err) => dispatch({
      type: `SET_CONVERTER_ERROR`,
      payload:{
        error: {
          status: true,
          message: err.message
        }
      }
    }));
}

// добавления курсов валют, payload объект со свойствами type (current или converted поле) и value {type, value}
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

// для задания статусов, любое поле не обязательное
const setTableStatuses = (newActiveStatus, newIsLoading, newError) => (dispatch, getState) =>{
  const {activeStatus, isLoading, error} = getState().currenciesTable;

  dispatch ({
    type: `SET_TABLE_STATUSES`,
    payload:{
      activeStatus: (newActiveStatus !== undefined) ? newActiveStatus : activeStatus,
      isLoading: (newIsLoading !== undefined) ? newIsLoading : isLoading,
      error: (newError !== undefined) ? newError : error,
    }
  });
}

// payload объект c валютными парами вида: {pairName: numberValue}
const addCurrenciesValues = () => (dispatch, getState) =>{
  const {currencyList, currenciesTable: {currentCurrency}} = getState();

  // до начала получения данных, сбрасываем состояния до initialState, после получения, отсылаем в store и переводим loading в false
  setTableStatuses(false, true, {status: false, message: null})(dispatch, getState);

  currencyPairService.getAllCourses(currentCurrency, currencyList)
    .then((payload) => dispatch({
      type: `ADD_CURRENCIES_VALUES`,
      payload
    }))
    .catch((err) =>
      setTableStatuses(undefined,
        false,
        {status: true, message: err.message})
      (dispatch, getState))
    .finally(() =>
      setTableStatuses(undefined,
        false)(dispatch, getState));
}

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
  setCurrencyInTable,
  setTableStatuses
}