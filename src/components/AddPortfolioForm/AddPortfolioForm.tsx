import React, { ReactElement, useCallback } from "react";
import { Button, Form, Input } from "antd";

/**
 * Add a new Currency
 */
function AddPortfolioForm(): ReactElement {
  const [form] = Form.useForm();

  const handleAddCurrency = useCallback(async (values) => {
    const { name, description, currencyId } = values;
    const portfolio = {
      name,
      description,
      currencyId
    };
    //Add the currency
  }, []);

  return (
    <Form form={form} name="basic" onFinish={handleAddCurrency}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the portfolio" }
        ]}
      >
        <Input type="text" placeholder="EURO, Dolar, Pound..." />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please input the portfolio description" }
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Currency
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCurrencyForm;
