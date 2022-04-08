import {returnRoundValue, returnAnotherFieldType, returnConvertedValue} from "../utils";

const initialState = {
  current:{
    currency: `USD`,
    value: 1,
    exchangeRate: ``
  },
  converted:{
    currency: `RUB`,
    value: ``,
    exchangeRate: ``
  },
  listsStatus:{
    current: false,
    converted: false
  },
  dataType: `currency-converter-item`,
  error: {
    status: false,
    message: null
  }
};

const updateConverter = (state = initialState, action) => {
  switch (action.type) {
    // получение обменного курса для пары валют
    case `FETCH_PAIR_VALUE`:
      const {value: currentValue } = state.current;

      // вычисляем конвертируемое значение и округляем его
      const convertedValue = (currentValue) ? returnRoundValue((currentValue * action.payload[0])) : ``;

      return {
        ...state,
        current:{
          ...state.current,
          exchangeRate: action.payload[0]
        },
        converted:{
          ...state.converted,
          value: convertedValue,
          exchangeRate: action.payload[1],
        }
      }
    // добавление нового значения для определенного поля и сконвертированного результата для другого поля
    case `ADD_CURRENCY_VALUE`:
      const {type, value} = action.payload;
      const anotherType = returnAnotherFieldType(type);
      const anotherValue = returnConvertedValue(value, state[type].exchangeRate);

      return {
        ...state,
        [type]: {
          ...state[type],
          value: (value) ? value : ``,
        },
        [anotherType]: {
          ...state[anotherType],
          value: anotherValue
        }
      }
    // изменение валюты у определеннго поля
    case `SET_CURRENCY`:
      return {
          ...state,
          [action.payload.type]: {
            ...state[action.payload.type],
            currency: action.payload.value
          }
        }
    // изменить статус активности у определенного списка
    case `SET_LIST_STATUS`:
      return {
        ...state,
        listsStatus:{
          ...state.listsStatus,
          ...action.payload
        }
      }
    // установить error
    case `SET_CONVERTER_ERROR`:
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}

export default updateConverter;