
export default class CurrencyPairService  {

  path = `https://currate.ru/api/?get=rates&pairs=`;
  key = `&key=5cfa0920d512aaf1ebb52c933bf209ce`;

  async getCourse(pair){

    // получаем адрес путем конкатенации пути, валютной пары и ключа
    return fetch(this.path + pair + this.key)
      .then((response) => response.json())
      // преобразуем курс в число и округляем до сотых
      .then((result) => Number(result.data[pair]).toFixed(2));
  }
}