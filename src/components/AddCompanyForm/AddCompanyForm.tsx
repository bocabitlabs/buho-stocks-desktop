import React, {
  ReactElement,
  useContext,
  useEffect,
  useState
} from "react";
import { Form, Input, Button, Select, message } from "antd";
import { CirclePicker } from "react-color";

import TextArea from "antd/lib/input/TextArea";
import { CurrencyFields } from "../../types/currency";
import { MarketFields } from "../../types/market";
import { SectorFields } from "../../types/sector";
import { CompanyItemProps } from "../../types/company";
import { CurrenciesContext } from "../../contexts/currencies";
import { MarketsContext } from "../../contexts/markets";
import { SectorsContext } from "../../contexts/sectors";
import CompanyService from "../../services/company-service";
import { useHistory } from "react-router-dom";

interface AddCompanyFormProps {
  portfolioID: string;
}

/**
 * Add a new Currency
 */
function AddCompanyForm({ portfolioID }: AddCompanyFormProps): ReactElement {
  const [form] = Form.useForm();
  const { currencies } = useContext(CurrenciesContext);
  const { markets } = useContext(MarketsContext);
  const { sectors } = useContext(SectorsContext);
  const [color, setColor] = useState("#607d8b");
  const history = useHistory();
  const key = "updatable";

  const handleAddCompany = (values: any) => {
      const {
        url,
        name,
        ticker,
        market,
        sector,
        currency,
        description,
        color
      } = values;
      const company: CompanyItemProps = {
        url: url,
        name: name,
        ticker: ticker,
        market: market,
        sector: sector,
        color: color,
        description: description,
        currency: currency,
        portfolio: portfolioID
      };
      console.log(values);
      const added = new CompanyService().addCompany(company)
      if (added === "OK") {
        history.push({
          pathname: `/portfolios/${portfolioID}`,
          state: {
            message: { type: "success", text: "Company has been added" }
          }
        });
      } else {
        setTimeout(() => {
          message.error({
            content: "Unable to add the  company",
            key,
            duration: 2
          });
        }, 1000);
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
        label="Ticker"
        rules={[
          { required: true, message: "Please input the company's ticker" }
        ]}
      >
        <Input type="text" placeholder="NASDQ:MSFT, NYSE:T..." />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
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
