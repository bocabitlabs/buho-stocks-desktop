import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Switch } from "antd";

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
import CountrySelector from "components/CountrySelector/CountrySelector";
import ColorSelector from "components/ColorSelector/ColorSelector";

interface CompanyAddEditFormProps {
  portfolioId: string;
  companyId?: string;
}

/**
 * Add a new Currency
 */
function CompanyAddEditForm({
  portfolioId,
  companyId
}: CompanyAddEditFormProps): ReactElement | null {
  const [form] = Form.useForm();
  const { currencies } = useContext(CurrenciesContext);
  const { markets } = useContext(MarketsContext);
  const { sectors } = useContext(SectorsContext);
  const {
    company,
    fetchCompany: getCompanyById,
    addCompany,
    update: updateCompany
  } = useContext(CompaniesContext);

  const history = useHistory();
  const [color, setColor] = useState(company ? company.color : "#607d8b");
  const [countryCode, setCountryCode] = useState("");
  const key = "updatable";

  useEffect(() => {
    if (companyId) {
      const newCompany = getCompanyById(companyId);
      if (newCompany) {
        setColor(newCompany.color);
        setCountryCode(newCompany.countryCode);
      }
    }
  }, [companyId, getCompanyById]);

  const handleAddCompany = (values: any) => {
    const {
      url,
      name,
      ticker,
      broker,
      closed,
      marketId,
      sectorId,
      currencyId,
      description,
      dividendsCurrencyId,
      alternativeTickers
    } = values;
    const newCompany: CompanyFormFields = {
      url,
      name,
      ticker,
      countryCode,
      closed,
      broker,
      marketId,
      sectorId,
      color,
      description,
      currencyId,
      dividendsCurrencyId,
      portfolioId,
      alternativeTickers
    };
    let changes = null;

    if (companyId) {
      changes = updateCompany(companyId, newCompany);
    } else {
      changes = addCompany(newCompany);
    }
    if (changes.changes) {
      if (!companyId) {
        TransactionLogService.add({
          type: "Add company",
          message: `Added company "${newCompany.name} (${newCompany.ticker})"`,
          portfolioId: +newCompany.portfolioId
        });
        message.success({ content: "Company has been added", key });
        history.push(`/portfolios/${portfolioId}`);
      } else {
        message.success({ content: "Company has been updated", key });
        history.push(`/portfolios/${portfolioId}/companies/${companyId}`);
      }
    } else {
      message.error({ content: "Unable to add/edit the  company", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  };

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
  };

  if (companyId && !company) {
    return null;
  }
  const closed = company?.closed ? true : false;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleAddCompany}
      initialValues={{
        name: company?.name,
        ticker: company?.ticker,
        alternativeTickers: company?.alternativeTickers,
        broker: company?.broker,
        closed: closed,
        sectorId: company?.sectorId,
        currencyId: company?.currencyId,
        dividendsCurrencyId: company?.dividendsCurrencyId,
        marketId: company?.marketId,
        url: company?.url,
        description: company?.description
      }}
    >
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
      <Form.Item name="countryCode" label="Country">
        <CountrySelector
          handleChange={handleCountryChange}
          initialValue={company?.countryCode}
        />
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
      <Form.Item
        label={
          <div>
            Color:{" "}
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="25"
                height="25"
                rx="5"
                ry="5"
                fill={color}
              />
            </svg>
          </div>
        }
      >
        <ColorSelector color={color} handleColorChange={handleColorChange} />
      </Form.Item>
      <Form.Item label="Closed" name="closed" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="sectorId" label="Sector" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {sectors &&
            sectors.map((sector: Sector, index: number) => (
              <Select.Option
                value={sector.id}
                key={`sector-${sector.id}-${index}`}
              >
                {sector.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="currencyId"
        label="Currency"
        rules={[{ required: true }]}
      >
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
      <Form.Item
        name="dividendsCurrencyId"
        label="Dividends currency"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select the currency of the dividends if it's different from the company's one"
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
      <Form.Item name="marketId" label="Market" rules={[{ required: true }]}>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {companyId ? "Edit Company" : "Add Company"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CompanyAddEditForm;
