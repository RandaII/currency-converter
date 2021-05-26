
const initialState = {
  currenciesInfo: {
    currentCurrency: `USD`,
    convertedCurrency: `RUB`,
  }
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case `FETCH_PAIR_VALUE`:
      return{
        ...state,
        currenciesInfo: {
          ...state.currenciesInfo,
          exchangeRate: action.payload
        }
      }
    default:
      return state;
  }
}


export default reducer;