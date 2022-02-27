import PropTypes from "prop-types";

// проверяем значение на запрещенные символы и преобразует
const returnCheckedValue = (value) =>{

  const numberRegExp = /^\.|^,|[^\d.,]|[.,]\d+[.,]|([.,]{2})/gm;

  // проверяем значение на ввод иных символов, кроме чисел, точки и запятой, (а также дублирования точки/запятой) в случае их присутствия, обрезаем строку до прежнего состояния
  const match = value.match(numberRegExp)?.[0];
  if (match){
    const index = value.indexOf(match);
    value = value.slice(0, index) + value.slice(index + 1);
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

// возвращает, особым образом округленное значение
const returnRoundValue = (value) =>{
  // функция для возврата округленного значения
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
  ],
}

// возвращает другой тип поля для конвертера
const returnAnotherFieldType = (value) => (value === `current`) ? `converted` : `current`;

// общий handler для выключения currency-list
const listDisablerHandler = (evt, status, dataType, func) =>{
  // срабатывает при true статусе, по клику или нажатию клавиши таб
  if (status &&
    (evt.type === `click` ||
    evt.key === `Tab`)){

    const attributeValue = evt.target.getAttribute(`data-element-type`);
    // если нет необходимого значения атрибута, вызываем disable функцию
    if (attributeValue !== dataType) {func();}
  }
}

// функция для возрата сконвертированного значения
const returnConvertedValue = (value, exchangeRate) =>
    value ? returnRoundValue(+value * exchangeRate) : ``;

export {
  returnCheckedValue,
  returnRoundValue,
  returnAnotherFieldType,
  returnConvertedValue,
  PropTypesTemplates,
  listDisablerHandler
}