import PropTypes from "prop-types";

const returnCheckedValue = (value) =>{

  const numberRegExp = /^\.|^,|[^\d\.,]|[\.,]\d+[\.,]|([\.,]{2})/gm;

  // проверяем на ввод иных символов, кроме чисел, точки и запятой, в случае их присутствия, обрезаем строку до прежнего состояния
  if (numberRegExp.test(value)){
    return value.slice(0, (value.length - 1));
  }

  // проверяем, что после нуля не идет целое число, и срезаем 0 в случае целого числа, а не точки)

  if (value[0] === `0` && value.length > 1 && value[1] !== `.`){
    value = value.slice(1);
  }

  // конвертация запятой в точку
  const commaIndex = value.indexOf(`,`);
  if (commaIndex !== -1){
    value = value.slice(0, commaIndex) + `.` + value.slice(commaIndex + 1);
  }
  return value;
}

const returnRoundValue = (value) =>{
  if (value >= 0.1){
    return +value.toFixed(2);
  }
  else if (value < 0.1 && value > 0){
    return +value.toFixed(3)

  }
  else if (value === 0){
    return 0;
  }
}

const PropTypesTemplates = {

   stringWithNumber: [
      PropTypes.string,
      PropTypes.number
   ],

   currenciesArray: [
    `RUB`,
    `USD`,
    `EUR`,
    `GBP`,
    `BYN`
  ]
}

const returnAnotherCurrencyType = (value) => {
  if (value === `currentCurrencyValue`)
    return [`convertedCurrencyValue`, `exchangeRate`];
  else return [`currentCurrencyValue`, `reverseExchangeRate`];
}

const returnConvertedValue =
  (value, state, convertedCurrency) =>
    value ? returnRoundValue(+value * state[convertedCurrency]) : ``;

export {
  returnCheckedValue,
  returnRoundValue,
  returnAnotherCurrencyType,
  returnConvertedValue,
  PropTypesTemplates
}