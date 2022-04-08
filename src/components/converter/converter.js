import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchPairValue, setListStatus} from "../../actions";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates, listDisablerHandler} from "../../utils";
import ErrorIndicator from "../error-indicator";
import ErrorBoundary from "../error-boundary";
import ConverterView from "../converter-view";

class Converter extends Component {

  static propTypes = {
    converter: PropTypes.shape({
      converted: PropTypes.shape({
        currency: PropTypes.oneOf(Templates.currenciesArray).isRequired
      }).isRequired,
      current: PropTypes.shape({
        currency: PropTypes.oneOf(Templates.currenciesArray).isRequired
      }).isRequired,
      dataType: PropTypes.string.isRequired,
      listsStatus: PropTypes.shape({
        current: PropTypes.bool.isRequired,
        converted: PropTypes.bool.isRequired,
      }).isRequired,
      error: PropTypes.shape({
        status: PropTypes.bool.isRequired,
        message: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string
        ])
      })
    }),
    fetchPairValue: PropTypes.func.isRequired,
    setListStatus: PropTypes.func.isRequired
  };

  // Типы для row компонентов
  rowTypes = [
    {id:0, type:`current`},
    {id:1, type:`converted`}
  ];

  // listener отслеживает клики, при любом активном currency-list, при клике, вне окна, или же при смене фокуса на элемент без необходимого dataType, меняет состояние на false
  listDisabler = (evt) =>{
    const {dataType, listsStatus:{current, converted}} = this.props.converter;
    const activeStatus = current || converted;
    const func = () =>
        this.props.setListStatus({
          current: false,
          converted: false
        });
    // для проверки соблюдения условий, используется общий handler
    listDisablerHandler(evt, activeStatus, dataType, func);
  }

  // после монтирования получаем текущий курс и назначаем обработчики
  componentDidMount() {
    this.props.fetchPairValue();
    document.addEventListener(`click`, this.listDisabler);
    document.addEventListener(`keyup`, this.listDisabler);
  }

  componentWillUnmount() {
    document.removeEventListener(`click`, this.listDisabler);
    document.removeEventListener(`keyup`, this.listDisabler);
  }

  render() {

    const {status: errorStatus} = this.props.converter.error;

    // в зависимости от статуса, показываем нужный компонент
    return (
      <ErrorBoundary>
        {(errorStatus && <ErrorIndicator/>) ||
        <ConverterView
          rowTypes={this.rowTypes}
          fetch={this.props.fetchPairValue}/>}
      </ErrorBoundary>);
  }
}

const mapDispatchToProps = {fetchPairValue, setListStatus};

const mapStateToProps = ({converter}) => ({
  converter:{
    current: {currency:converter.current.currency},
    converted: {currency:converter.converted.currency},
    dataType: converter.dataType,
    listsStatus: converter.listsStatus,
    error: converter.error
  }});

export default connect(mapStateToProps, mapDispatchToProps)(Converter);