import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form } from "antd";
import { addCurrency } from "../../daos/currency-dao";
import sampleCurrencies from "./sample-currencies";
import { CurrencyItemProps } from "../../types/currency";
/**
 * Add a new Currency
 */
function AddSampleCurrenciesForm(): ReactElement {
  const [form] = Form.useForm();

  const [currencies, setCurrencies] = useState(sampleCurrencies);

  const handleAddCurrencies = useCallback(async () => {
    currencies.forEach((currency: CurrencyItemProps) => {
      addCurrency(currency, setCurrencies);
    });
  }, [currencies]);

  return (
    <Form form={form} name="basic" onFinish={handleAddCurrencies}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Sample Currencies
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSampleCurrenciesForm;
