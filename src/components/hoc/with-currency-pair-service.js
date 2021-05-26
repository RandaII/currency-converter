import React from "react";
import {CurrencyPairServiceConsumer} from "../currency-pair-service-context";


const withCurrencyPairService = () => (Wrapped) =>{
  return (props) =>{
    return (
      <CurrencyPairServiceConsumer>
        {
          (currencyPairService) =>{
            return <Wrapped {...props} currencyPairService={currencyPairService}></Wrapped>
          }
        }
      </CurrencyPairServiceConsumer>
    );
  }
}

export default withCurrencyPairService;