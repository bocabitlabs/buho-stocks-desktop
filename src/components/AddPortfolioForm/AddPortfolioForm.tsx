import React, { ReactElement, useCallback, useContext, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { CurrencyFields } from "../../types/currency";
import { PortfoliosContext } from "../../contexts/portfolios";
import { CurrenciesContext } from "../../contexts/currencies";

/**
 * Add a new Currency
 */
function AddPortfolioForm(): ReactElement {
  const [form] = Form.useForm();

  const { addPortfolio } = useContext(PortfoliosContext);
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);


  const handleAddCurrency = useCallback(async (values) => {
    const { name, description, currencyId } = values;
    const portfolio = {
      name,
      description,
      currencyId
    };
    addPortfolio(portfolio)
  }, [addPortfolio]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <Form form={form} name="basic" onFinish={handleAddCurrency}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the portfolio" }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please input the portfolio description" }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item name="currencyId" label="Currency" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {currencies &&
            currencies.map((currency: CurrencyFields, index: number) => (
              <Select.Option
                value={currency.id}
                key={`currency-${currency.id}-${index}`}
              >
                {currency.name} ({currency.abbreviation})
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      {/* {JSON.stringify(result)} */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Portfolio
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddPortfolioForm;
