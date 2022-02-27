import React from "react";
import Proptypes from "prop-types";

const CurrenciesTableBody = ({children}) =>(
  <tbody>
    {
      Object.entries(children).map(([pair, value], i) =>(
        <tr className="currency-table__row" key={i}>
          <td>{pair.slice(0,3)}/{pair.slice(3)}</td>
          <td>{value}</td>
        </tr>))
    }
  </tbody>);

CurrenciesTableBody.propTypes = {
  children: Proptypes.object.isRequired
}

export default CurrenciesTableBody