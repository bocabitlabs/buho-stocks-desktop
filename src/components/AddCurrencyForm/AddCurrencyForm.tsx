import React, { ReactElement } from "react";
import { Button, Form, Input, message } from "antd";
import { CirclePicker } from "react-color";

import CurrencyService from "../../services/currency-service";
import { useHistory } from "react-router-dom";

/**
 * Add a new Currency
 */
function AddCurrencyForm(): ReactElement {
  const [form] = Form.useForm();
  const history = useHistory();
  const key = "updatable";
  let color = "#607d8b";

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
    if (added === "OK") {
      history.push({
        pathname: "/currencies",
        state: {
          message: { type: "success", text: "Currency has been added" }
        }
      });
    } else {
      setTimeout(() => {
        message.error({
          content: "Unable to add the currency",
          key,
          duration: 2
        });
      }, 1000);
    }
  };

  const handleColorChange = (color: any, event: any) => {
    color = color.hex;
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

export default AddCurrencyForm;
