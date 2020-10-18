import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getCurrencies } from "../../daos/currency-dao";
import { CurrencyFields } from "../../types/currency";
import { getMarkets } from "../../daos/market-dao";
import { MarketFields } from "../../types/market";

/**
 * Add a new Currency
 */
function AddCompanyForm(): ReactElement {
  const [form] = Form.useForm();
  const [currencies, setCurrencies] = useState([]);
  const [markets, setMarkets] = useState([]);

  const handleAddCompany = useCallback(async (values) => {
    const { link, name, ticker, market, currency, notes } = values;
    const company = {
      link: link,
      name: name,
      ticker: ticker,
      market: market,
      notes: notes,
      currency: currency
    };
    console.log(values);
    // Add company
  }, []);

  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  useEffect(() => {
    getMarkets(setMarkets);
  }, []);

  return (
    <Form form={form} name="basic" onFinish={handleAddCompany}>
      <Form.Item
        name="name"
        label="Company Name"
        rules={[
          { required: true, message: "Please input the name of the company" }
        ]}
      >
        <Input type="text" placeholder="Microsoft, AT&T ..." />
      </Form.Item>
      <Form.Item
        name="ticker"
        label="Ticker"
        rules={[
          { required: true, message: "Please input the company's ticker" }
        ]}
      >
        <Input type="text" placeholder="NASDQ:MSFT, NYSE:T..." />
      </Form.Item>
      <Form.Item
        name="sector"
        label="Sector"
        rules={[
          { required: false }
        ]}
      >
        <Input type="text" placeholder="" />
      </Form.Item>
      <Form.Item name="currency" label="Currency" rules={[{ required: true }]}>
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
      <Form.Item name="market" label="Market" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {markets &&
            markets.map((market: MarketFields, index: number) => (
              <Select.Option
                value={market.id}
                key={`market-${market.id}-${index}`}
              >
                {market.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="url" label="url">
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: false, message: "" }
        ]}
      >
        <TextArea placeholder="" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Company
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCompanyForm;
