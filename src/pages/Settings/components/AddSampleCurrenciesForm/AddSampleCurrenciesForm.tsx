import React, { ReactElement, useState } from "react";
import { Button, Form } from "antd";
import sampleCurrencies from "./sample-currencies";
import { CurrencyFormFields } from "types/currency";
import CurrencyService from "services/currency-service";
/**
 * Add a new Currency
 */
function AddSampleCurrenciesForm(): ReactElement {
  const [form] = Form.useForm();

  const [currencies] = useState(sampleCurrencies);

  const handleAddCurrencies = () => {
    currencies.forEach((currency: CurrencyFormFields) => {
      new CurrencyService().addCurrency(currency);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      onFinish={handleAddCurrencies}
    >
      <Form.Item label="Add sample currencies">
        <Button type="primary" htmlType="submit">
          Add Sample Currencies
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSampleCurrenciesForm;
