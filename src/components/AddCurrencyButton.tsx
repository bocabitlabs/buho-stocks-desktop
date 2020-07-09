import React, { ReactElement } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addCurrency } from "../actions/currency";
/**
 *
 */
function AddCurrencyButton(): ReactElement {
  const dispatch = useDispatch();

  const addCurrencyAction = () => {
    console.log("Called addCurrencyAction");
    dispatch(addCurrency("Euro", "EUR"));
  };

  return (
    <Button type="primary" onClick={addCurrencyAction}>
      Add new Currency
    </Button>
  );
}

export default AddCurrencyButton;
