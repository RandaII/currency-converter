import React from 'react';

const ConverterInputField = () =>{
  return (
    <div className="converter__input-block">
      <input type="text" defaultValue='5555'/>
      <span className="converter__input-clear">&#215;</span>
    </div>
  );
}

export default ConverterInputField;