import updateConverter from "./converter";
import updateCurrenciesTable from "./currencies-table";

const initialState = {
  currencyList: [
    `RUB`,
    `USD`,
    `EUR`,
    `GBP`,
    `BYN`
  ],
};

const reducer = (state = initialState, action) =>
  ({
    ...state,
    converter: updateConverter(state.converter, action),
    currenciesTable: updateCurrenciesTable(state.currenciesTable, action)
  });

export default reducer;