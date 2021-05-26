import React from "react";

const {
  Provider: CurrencyPairServiceProvider,
  Consumer: CurrencyPairServiceConsumer
} = React.createContext();

export {
  CurrencyPairServiceProvider,
  CurrencyPairServiceConsumer
}