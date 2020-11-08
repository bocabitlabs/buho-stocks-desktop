import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import { CirclePicker } from "react-color";

import CurrencyService from "../../services/currency-service";

/**
 * Add a new Currency
 */
function AddCurrencyForm(): ReactElement {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const [color, setColor] = useState("#607d8b");

  const handleAddCurrency = useCallback(
    async (values) => {
      const { currencyName, abbreviation, symbol, country } = values;
      const currency = {
        name: currencyName,
        abbreviation: abbreviation,
        symbol: symbol,
        country,
        color
      };
      //Add the currency
      new CurrencyService().addCurrency(currency, setResult);
    },
    [color]
  );

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
  };

  return (
    <Form form={form} name="basic" onFinish={handleAddCurrency}>
      <Form.Item
        name="currencyName"
        label="Currency Name"
        rules={[
          { required: true, message: "Please input the name of the currency" }
        ]}
      >
        <Input type="text" placeholder="EURO, Dolar, Pound..." />
      </Form.Item>
      <Form.Item
        name="abbreviation"
        label="Abbreviation"
        rules={[
          { required: true, message: "Please input the currency abbreviation" }
        ]}
      >
        <Input type="text" placeholder="EUR, USD, GBP..." />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item
        name="symbol"
        label="Symbol"
        rules={[
          { required: true, message: "Please input the currency symbol" }
        ]}
      >
        <Input type="text" placeholder="€, $, £..." />
      </Form.Item>
      <Form.Item
        name="country"
        label="Country"
        rules={[
          { required: true, message: "Please input the currency  country" }
        ]}
      >
        <Input type="text" placeholder="USA, EU, Japan..." />
      </Form.Item>
      {JSON.stringify(result)}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Currency
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCurrencyForm;
