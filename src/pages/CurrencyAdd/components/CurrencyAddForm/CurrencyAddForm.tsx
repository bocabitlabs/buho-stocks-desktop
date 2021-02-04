import React, { ReactElement, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { CirclePicker } from "react-color";

import { useHistory } from "react-router-dom";
import CurrencyService from "../../../../services/currency-service";

/**
 * Add a new Currency
 */
function CurrencyAddForm(): ReactElement {
  const [form] = Form.useForm();
  const history = useHistory();
  const [color, setColor] = useState("#607d8b");

  const key = "updatable";


  const handleAdd = (values: any) => {
    message.loading({ content: "Adding currency...", key });

    const { currencyName, abbreviation, symbol, country } = values;
    const currency = {
      name: currencyName,
      abbreviation: abbreviation,
      symbol: symbol,
      country,
      color
    };
    //Add the currency
    const added = new CurrencyService().addCurrency(currency);
    if (added.changes) {
      history.push("/currencies");
      message.success({ content: "Currency has been added", key });
    } else {
      message.success({ content: "Unable to add the currency", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  };

  return (
    <Form form={form} name="basic" onFinish={handleAdd}>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Currency
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CurrencyAddForm;
