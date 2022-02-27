import {returnRoundValue} from "../utils";

export default class CurrencyPairService  {

  #path = `https://currate.ru/api/?get=rates&pairs=`;
  #key = `&key=c2ce7bb0c7510d68824e52174a9e452a`;

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

    // получаем адрес путем конкатенации пути, валютной пары и ключа
    return fetch(this.#path + currencyPairs + this.#key)
      .then((response) => response.json())
      // преобразуем полученый курс в пару массив, перед этим проверяя на корректный ответ от сервера
      .then((result) =>{
        this._errorHandler(result);
        return this.#formatResult(result.data, pairArray)
      })
      .catch((err) => {throw err})
  }

  getAllCourses(currency, list){
    // составляем пары
    let pairs = list.reduce((pairs, currentValue,) => pairs += `${currency}${currentValue},`, ``);

    return fetch(this.#path +pairs + this.#key)
      .then((response) => response.json())
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