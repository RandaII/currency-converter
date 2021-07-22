import {returnRoundValue} from "../utils";

export default class CurrencyPairService  {

  path = `https://currate.ru/api/?get=rates&pairs=`;
  key = `&key=5cfa0920d512aaf1ebb52c933bf209ce`;

  async getCourse(pairArray){

    if (pairArray[0] === pairArray[1]){
      return [1,1];
    }

    // получаем адрес путем конкатенации пути, валютной пары и ключа
    return fetch(this.path + pairArray[0] + `,` + pairArray[1] + this.key)
      .then((response) => response.json())
      // преобразуем полученый курс в пару массив
      .then((result) =>formatString(result.data, pairArray));
  }

  async getAllCourse(currency, list){

    let pairs = ``;
    list.map(item =>{
      pairs += `${currency}${item},`
    })

    return fetch(this.path + pairs + this.key)
      .then((response) => response.json())
      .then((result) =>{
        for (let key in result.data){
          result.data[key] = returnRoundValue(Number(result.data[key]));
        }
        return result.data;
      });
    ;
  }

}

const formatString = (value, pair) =>{
  const arr = [];
  pair.forEach((item) =>{
    arr.push(returnRoundValue(Number(value[item])));
  })
  return arr;
}