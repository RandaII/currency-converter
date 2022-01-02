import updateConverter from "./converter";
import updateCurrenciesTable from "./currencies-table";
import CurrencyPairService from "../services/currency-pair-service";

const initialState = {
  currencyList: [
    `RUB`,
    `USD`,
    `EUR`,
    `GBP`,
    `BYN`
  ],
  currencyPairService: new CurrencyPairService()
};

const reducer = (state = initialState, action) => {
  return{
    ...state,
    converter: updateConverter(state.converter, action),
    currenciesTable: updateCurrenciesTable(state.currenciesTable, action)
  }
}

export default reducer;