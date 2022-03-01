import {returnRoundValue} from "../utils";

// функция для метода getCourse
const returnPairCourse = async (pairs) =>{

  let response = {
    'USDRUB,RUBUSD': {
      data: {USDRUB: '64.1824', RUBUSD: '0.0155806'},
      message: "rates",
      status: 200,
    },
    'USDEUR,EURUSD': {
      data: {USDEUR: '0.92674', EURUSD: '1.07905'},
      message: "rates",
      status: 200
    },
    'USDGBP,GBPUSD': {
      data: {USDGBP: '0.7763', GBPUSD: '1.28841'},
      message: "rates",
      status: 200
    },
    'USDBYN,BYNUSD': {
      data: {USDBYN: '2.20558', BYNUSD: '0.453396'},
      message: "rates",
      status: 200
    },
    'RUBUSD,USDRUB': {
      data: {RUBUSD: '0.0155806', USDRUB: '64.1824'},
      message: "rates",
      status: 200
    },
    'RUBEUR,EURRUB': {
      data: {RUBEUR: '0.0144437', EURRUB: '69.244'},
      message: "rates",
      status: 200
    },
    'RUBGBP,GBPRUB': {
      data: {RUBGBP: '0.0120952', GBPRUB: '82.6773'},
      message: "rates",
      status: 200
    },
    'RUBBYN,BYNRUB': {
      data: {RUBBYN: '0.0343642', BYNRUB: '29.1002'},
      message: "rates",
      status: 200
    },
    'EURRUB,RUBEUR': {
      data: {EURRUB: '69.244', RUBEUR: '0.0144437'},
      message: "rates",
      status: 200
    },
    'EURUSD,USDEUR': {
      data: {EURUSD: '1.07905', USDEUR: '0.92674'},
      message: "rates",
      status: 200
    },
    'EURGBP,GBPEUR': {
      data: {EURGBP: '0.83767', GBPEUR: '1.19402'},
      message: "rates",
      status: 200
    },
    'EURBYN,BYNEUR': {
      data: {EURBYN: '2.37994', BYNEUR: '0.420182'},
      message: "rates",
      status: 200
    },
    'GBPRUB,RUBGBP': {
      data: {GBPRUB: '82.6773', RUBGBP: '0.0120952'},
      message: "rates",
      status: 200
    },
    'GBPUSD,USDGBP': {
      data: {GBPUSD: '1.28841', USDGBP: '0.7763'},
      message: "rates",
      status: 200
    },
    'GBPEUR,EURGBP': {
      data: {GBPEUR: '1.19402', EURGBP: '0.83767'},
      message: "rates",
      status: 200
    },
    'GBPBYN,BYNGBP': {
      data: {GBPBYN: '2.84169', BYNGBP: '0.351973'},
      message: "rates",
      status: 200
    },
    'BYNRUB,RUBBYN': {
      data: {BYNRUB: '29.1002', RUBBYN: '0.0343642'},
      message: "rates",
      status: 200
    },
    'BYNUSD,USDBYN': {
      data: {BYNUSD: '0.453396', USDBYN: '2.20558'},
      message: "rates",
      status: 200
    },
    'BYNEUR,EURBYN': {
      data: {BYNEUR: '0.420182', EURBYN: '2.37994'},
      message: "rates",
      status: 200
    },
    'BYNGBP,GBPBYN': {
      data: {BYNGBP: '0.351973', GBPBYN: '2.84169'},
      message: "rates",
      status: 200
    },
  };

  return new Promise((resolve =>
    setTimeout(() =>resolve(response[pairs])
    , 100)
   ));
}
// функция для метода getAllCourses
const returnAllPairs = (currency) =>{

  let response = {
    "USD":{
        data: {USDRUB: '64.1824', USDEUR: '0.92674', USDGBP: '0.7763', USDBYN: '2.20558'},
        message: "rates",
        status: 200
      },
    "RUB":{
      data: {RUBUSD: '0.0155806', RUBEUR: '0.0144437', RUBGBP: '0.0120952', RUBBYN: '0.0343642'},
      message: "rates",
      status: 200
    },
    "EUR":{
      data: {EURRUB: '69.244', EURUSD: '1.07905', EURGBP: '0.83767', EURBYN: '2.37994'},
      message: "rates",
      status: 200
    },
    "GBP":{
      data: {GBPRUB: '82.6773', GBPUSD: '1.28841', GBPEUR: '1.19402', GBPBYN: '2.84169'},
      message: "rates",
      status: 200
    },
    "BYN":{
      data: {BYNRUB: '29.1002', BYNUSD: '0.453396', BYNEUR: '0.420182', BYNGBP: '0.351973'},
      message: "rates",
      status: 200
    },

  };

  return new Promise((resolve) =>
    setTimeout(() =>resolve(response[currency]), 1500));
}

export default class TestCurrencyPairService  {

  _errorHandler = (response) =>{
    switch (response.status) {
      case `500`:
        throw new Error(`Misspelled request`);
      case `403`:
        throw new Error(`Invalid api-key`);
      default:
        return;
    }
  }

  // возвращает массив из двух значений следующего вида: [currentCurrencyValue, convertedCurrencyValue]
  #formatResult = (values, pairsArray) => pairsArray.map(item => values[item]);

  getCourse(pairArray){
    // в случае если пара из одинаковых валют, возвращаем promise со значениями [1,1]
    if (pairArray[0] === pairArray[1]){
      return new Promise((resolve) => resolve([1,1]));
    }

    const currencyPairs =`${pairArray[0]},${pairArray[1]}`;

    return returnPairCourse(currencyPairs)
      // преобразуем полученый курс в пару массив, перед этим проверяя на корректный ответ
      .then((result) =>{
        this._errorHandler(result);
        return this.#formatResult(result.data, pairArray)
      })
      .catch((err) => {throw err})
  }

  getAllCourses(currency){
    return returnAllPairs(currency)
      .then((result) =>{
        // проверяем статус ответа, если необходимо вызываем ошибку
        this._errorHandler(result);

        // округляем полученные значения и возвращаем их
        for (let key in result.data){
          result.data[key] = returnRoundValue(Number(result.data[key]));
        }
        return result.data;
      })
      .catch((err) =>{throw err});
  }
}