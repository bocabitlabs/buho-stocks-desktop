import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form } from "antd";
import sampleCurrencies from "./sample-currencies";
import { CurrencyItemProps } from "../../types/currency";
import CurrencyService from "../../services/currency-service";
/**
 * Add a new Currency
 */
function AddSampleCurrenciesForm(): ReactElement {
  const [form] = Form.useForm();

  const [currencies, setCurrencies] = useState(sampleCurrencies);

  const handleAddCurrencies = useCallback(async () => {
    currencies.forEach((currency: CurrencyItemProps) => {
      new CurrencyService().addCurrency(currency, setCurrencies);
    });
  }, [currencies]);

  return (
    <Form form={form} name="basic" onFinish={handleAddCurrencies}>
      <Form.Item label="Add sample currencies">
        <Button type="primary" htmlType="submit">
          Add Sample Currencies
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSampleCurrenciesForm;
