
const returnCheckedValue = (value) =>{
  const numberRegExp = /^\.|[^\d\.]|\.\d+\.|\.\./gm;

  // проверяем на ввод иных символов, кроме чисел и в случае их присутствия, обрезаем строку до прежнего состояния
  if (numberRegExp.test(value)){
    return value.slice(0, (value.length - 1));
  }

  // проверяем, что после нуля не идет целое число, и срезаем 0 в случае целого числа, а не точки)

  if (value[0] === `0` && value.length > 1 && value[1] !== `.`){
    value = value.slice(1);
  }
  return value;
}

const returnRoundValue = (value) =>{
  if (value >= 0.1){
    return value.toFixed(2);
  }
  else if (value < 0.1 && value > 0){
    return value.toFixed(3)
  }
  else if (value === 0){
    return 0;
  }
}

export {
  returnCheckedValue,
  returnRoundValue
}