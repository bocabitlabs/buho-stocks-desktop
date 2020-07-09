import React, { ReactElement } from "react";
import { getCurrencies } from "../selectors/currency";
import { useSelector } from "react-redux";
import { CurrencyFields } from "../types/currency";

export default function CurrencyList(): ReactElement {
  const currencies = useSelector(getCurrencies);

  if (currencies && currencies.length > 0) {
    return (
      <ul>
        {currencies.map((currency: CurrencyFields) => (
          <li>{currency.name}</li>
        ))}
      </ul>
    );
  }

  return <div></div>;
}
