import React from 'react';

import * as styles from './app.scss';

const App = () => {
  return (
    <main className="converter">

      <div className="converter__currency-block">
        <div className="converter__input-block">
          <input type="text" defaultValue='5555' autoFocus/>
            <span className="converter__input-clear">&#215;</span>
        </div>
        <div className="converter__currency-type-block">
          <button className="converter__selected-currency converter__selected-currency--active">RUB
            <i className="fa fa-angle-down"></i>
          </button>
          <select name="currency" id="currency-list-1" className="converter__currency-list"></select>
        </div>
      </div>

      <div className="converter__currency-block">
        <div className="converter__input-block">
          <input type="text"/>
            <span className="converter__input-clear">&#215;</span>
        </div>
        <div className="converter__currency-type-block">
          <button className="converter__selected-currency">USD
            <i className="fa fa-angle-down"></i>
          </button>
          <select name="currency" id="currency-list-2" className="converter__currency-list"></select>
        </div>
      </div>

    </main>
  );
}


export default App;