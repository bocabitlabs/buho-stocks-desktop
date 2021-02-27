import React, { ReactElement, useContext, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { CirclePicker } from "react-color";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";

import { CurrenciesContext } from "contexts/currencies";
import { MarketsContext } from "contexts/markets";
import { SectorsContext } from "contexts/sectors";

import { CompanyFormFields } from "types/company";
import { Sector } from "types/sector";
import { Currency } from "types/currency";
import { Market } from "types/market";
import { CompaniesContext } from "contexts/companies";
import TransactionLogService from "services/transaction-log-service";

interface CompanyAddFormProps {
  portfolioId: string;
}

/**
 * Add a new Currency
 */
function CompanyAddForm({ portfolioId }: CompanyAddFormProps): ReactElement {
  const [form] = Form.useForm();
  const { currencies } = useContext(CurrenciesContext);
  const { markets } = useContext(MarketsContext);
  const { sectors } = useContext(SectorsContext);
  const { addCompany } = useContext(CompaniesContext);

  const history = useHistory();
  const [color, setColor] = useState("#607d8b");

  const key = "updatable";

  const handleAddCompany = (values: any) => {
    const {
      url,
      name,
      ticker,
      broker,
      market,
      sector,
      currency,
      description,
      alternativeTickers
    } = values;
    const company: CompanyFormFields = {
      url,
      name,
      ticker,
      closed: false,
      broker,
      market,
      sector,
      color,
      description,
      currency,
      portfolioId,
      alternativeTickers
    };
    const added = addCompany(company);
    if (added.changes) {
      TransactionLogService.add({
        type: "Add company",
        message: `Added company "${company.name} (${company.ticker})"`,
        portfolioId: +company.portfolioId
      });
      history.push(`/portfolios/${portfolioId}`);
      message.success({ content: "Company has been added", key });
    } else {
      message.error({ content: "Unable to add the  company", key });
    }
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
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
        label="Main Ticker"
        rules={[
          { required: true, message: "Please input the company's ticker" }
        ]}
      >
        <Input type="text" placeholder="NASDQ:MSFT, NYSE:T..." />
      </Form.Item>
      <Form.Item
        name="alternativeTickers"
        label="Alternative tickers"
        help={
          "These tickers will used to get real time information of the current company."
        }
      >
        <Input type="text" placeholder="MSFT, IBE.MC, UNA.AS" />
      </Form.Item>
      <Form.Item
        name="broker"
        label="Broker"
        rules={[
          { required: true, message: "Please input the company's broker" }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker color={color} onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item name="sector" label="Sector" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {sectors &&
            sectors.map((sector: Sector, index: number) => (
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
            currencies.map((currency: Currency, index: number) => (
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
            markets.map((market: Market, index: number) => (
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

export default CompanyAddForm;
