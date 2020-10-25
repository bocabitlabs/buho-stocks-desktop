import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getCurrencies } from "../../daos/currency-dao";
import { CurrencyFields } from "../../types/currency";
import { getMarkets } from "../../daos/market-dao";
import { getSectors } from "../../daos/sector-dao";
import { MarketFields } from "../../types/market";
import { SectorFields } from "../../types/sector";
import { addCompany } from "../../daos/company-dao";
import { CompanyItemProps } from "../../types/company";

interface AddCompanyFormProps {
  portfolioID: string;
}

/**
 * Add a new Currency
 */
function AddCompanyForm({ portfolioID }: AddCompanyFormProps): ReactElement {
  const [form] = Form.useForm();
  const [currencies, setCurrencies] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [_, setCompany] = useState([]);

  const handleAddCompany = useCallback(async (values) => {
    const { url, name, ticker, market, sector, currency, description } = values;
    const company: CompanyItemProps = {
      url: url,
      name: name,
      ticker: ticker,
      market: market,
      sector: sector,
      description: description,
      currency: currency,
      portfolio: portfolioID
    };
    console.log(values);
    addCompany(company, setCompany);
    // Add company
  }, [portfolioID]);

  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  useEffect(() => {
    getMarkets(setMarkets);
  }, []);

  useEffect(() => {
    getSectors(setSectors);
  }, []);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 }
  };

  return (
    <Form {...layout} form={form} name="basic" onFinish={handleAddCompany}>
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
      <Form.Item name="sector" label="Sector" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {sectors &&
            sectors.map((sector: SectorFields, index: number) => (
              <Select.Option
                value={sector.id}
                key={`currency-${sector.id}-${index}`}
              >
                {sector.name}
              </Select.Option>
            ))}
        </Select>
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
                {market.name} ({market.description})
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
        rules={[{ required: false, message: "" }]}
      >
        <TextArea placeholder="" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Add Company
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCompanyForm;
