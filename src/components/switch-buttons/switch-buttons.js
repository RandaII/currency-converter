import {NavLink} from "react-router-dom";
import React from "react";

import "./switch-buttons.scss";

const SwitchButtons = () =>(
  <div className="switch-buttons">
    <NavLink to="/" activeClassName="active" exact>Конвертер</NavLink>
    <NavLink to="/currencies-table" activeClassName="active">Таблица валют</NavLink>
  </div>);

export default SwitchButtons;