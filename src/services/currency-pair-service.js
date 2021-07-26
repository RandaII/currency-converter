//TODO заменить map на reduce


import {returnRoundValue} from "../utils";

export default class CurrencyPairService  {

  path = `https://currate.ru/api/?get=rates&pairs=`;
  key = `&key=5cfa0920d512aaf1ebb52c933bf209ce`;

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

  async getCourse(pairArray){

    if (pairArray[0] === pairArray[1]){
      return [1,1];
    }

    const currencyPair =`${pairArray[0]},${pairArray[1]}`;

    // получаем адрес путем конкатенации пути, валютной пары и ключа
    return fetch(this.path + currencyPair + this.key)
      .then((response) => response.json())
      // преобразуем полученый курс в пару массив, перед этим проверяя на корректный ответ от сервера
      .then((result) =>{
        this._errorHandler(result);
        return formatString(result.data, pairArray)
      })
      .catch((err) => {throw err})
  }

  async getAllCourse(currency, list){

    let pairs = list.reduce((pairs, currentValue,) => pairs += `${currency}${currentValue},`
    , ``);

    return fetch(this.path +pairs + this.key)
      .then((response) => response.json())
      .then((result) =>{

        this._errorHandler(result);

        for (let key in result.data){
          result.data[key] = returnRoundValue(Number(result.data[key]));
        }
        return result.data;
      })
      .catch((err) =>{
        throw err;
      });
  }
}

const formatString = (value, pair) =>{
  const arr = [];
  pair.forEach((item) =>{
    arr.push(returnRoundValue(Number(value[item])));
  })
  return arr;
}