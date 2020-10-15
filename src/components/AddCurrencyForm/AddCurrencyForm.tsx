import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import { addCurrency } from "../../daos/currency-dao";

/**
 * Add a new Currency
 */
function AddCurrencyForm(): ReactElement {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');

  const handleAddCurrency = useCallback(
    async (values) => {
      const { currencyName, abbreviation, symbol, country } = values;
      const currency = {
        name: currencyName,
        abbreviation: abbreviation,
        symbol: symbol,
        country
      };
      //Add the currency
      addCurrency(currency, setResult)
    },
    []
  );

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
