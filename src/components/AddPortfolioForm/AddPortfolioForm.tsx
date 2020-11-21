import React, { ReactElement, useContext } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { CirclePicker } from "react-color";

import { CurrencyFields } from "../../types/currency";
import { CurrenciesContext } from "../../contexts/currencies";
import PortfolioService from "../../services/portfolio-service";
import { useHistory } from "react-router-dom";

/**
 * Add a new Currency
 */
function AddPortfolioForm(): ReactElement {
  const [form] = Form.useForm();
  const history = useHistory();

  const { currencies } = useContext(CurrenciesContext);
  const key = "updatable";
  let color = "#607d8b";

  const handleAdd = (values: any) => {
    message.loading({ content: "Adding portfolio...", key });

    const { name, description, currencyId } = values;
    const portfolio = {
      name,
      description,
      currencyId,
      color
    };
    const portfolioService = new PortfolioService();
    const added = portfolioService.addPortfolio(portfolio);
    if (added === 'OK') {
      history.push({
        pathname: "/home",
        state: { message: {type: "success", text: "Portfolio has been added" }}
      });
    }else{
      setTimeout(() => {
        message.error({ content: "Unable to add the portfolio!", key, duration: 2 });
      }, 1000);
    }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    color = color.hex;
  };
  console.log("AddPortfolioForm rendered");
  console.log(currencies);
  return (
    <Form form={form} name="basic" onFinish={handleAdd}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the portfolio" }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item name="color" label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Portfolio
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddPortfolioForm;
