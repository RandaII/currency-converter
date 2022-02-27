import React from "react";
import ConverterRow from "../converter-row";
import PropTypes from "prop-types";
import "./converter-view.scss";

const ConverterView = ({rowTypes, fetch}) =>(
    <main className="converter">
      <div className="converter__wrapper">
        {
          rowTypes.map(({id, type}) =>(
            <ConverterRow key={id} type={type} fetch={fetch}/>
          ))
        }
      </div>
    </main>
  );

ConverterView.propTypes = {
  rowTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  fetch: PropTypes.func.isRequired
}

export default ConverterView;