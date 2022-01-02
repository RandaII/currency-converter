import {returnRoundValue, returnAnotherCurrencyType, returnConvertedValue} from "../utils";

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
  activeList:{
    current: false,
    converted: false
  }
};

const updateConverter = (state = initialState, action) => {
  switch (action.type) {
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
    case `ADD_CURRENCY_VALUE`:
      const {type, value} = action.payload;
      const anotherType = returnAnotherCurrencyType(type);
      const anotherValue = returnConvertedValue(value, state, type);

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
    case `CHANGE_CURRENCY`:
      return {
          ...state,
          [action.payload.type]: {
            ...state[action.payload.type],
            currency: action.payload.value
          }
        }
    case `CHANGE_ACTIVE_LIST`:
      return {
        ...state,
        activeList:{
          ...state.activeList,
          ...action.payload
        }
      }
    default: return state;
  }
}

export default updateConverter;