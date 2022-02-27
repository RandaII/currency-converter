import React from "react";
import CurrenciesTableBody from "../currencies-table-body";
import Proptypes from "prop-types";
import "./currencies-table-view.scss";

const CurrenciesTableView = ({children:{headerValues, bodyValues}}) =>(
  <div className="currency-table__wrapper">
    <table className="currency-table">
      <thead>
      <tr className="currency-table__row">
        {headerValues.map(({id, value}) => <th key={id}>{value}</th>)}
      </tr>
      </thead>
      <CurrenciesTableBody>{bodyValues}</CurrenciesTableBody>
    </table>
  </div>);

CurrenciesTableView.propTypes = {
  children: Proptypes.shape({
    headerValues: Proptypes.arrayOf(Proptypes.shape({
      id: Proptypes.number.isRequired,
      value: Proptypes.string.isRequired
    })).isRequired,
    bodyValues: Proptypes.object.isRequired
  }).isRequired
}

export default CurrenciesTableView;