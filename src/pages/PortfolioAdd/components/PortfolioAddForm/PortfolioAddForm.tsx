import React, { ReactElement, useContext, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { CirclePicker } from "react-color";
import { useHistory } from "react-router-dom";

import { CurrenciesContext } from "contexts/currencies";
import { Currency } from "types/currency";
import { PortfoliosContext } from "contexts/portfolios";

/**
 * Add a new Currency
 */
function PortfolioAddForm(): ReactElement {
  const [form] = Form.useForm();
  const history = useHistory();

  const { currencies } = useContext(CurrenciesContext);
  const { create } = useContext(PortfoliosContext);

  const [color, setColor] = useState("#607d8b");
  const key = "updatable";

  const handleAdd = (values: any) => {
    message.loading({ content: "Adding portfolio...", key });

    const { name, description, currencyId } = values;
    const portfolio = {
      name,
      description,
      currencyId,
      color
    };
    const added = create(portfolio);
    if (added.changes) {
      history.push("/home");
      message.success({ content: "Portfolio has been added", key });
    } else {
      message.success({ content: "Unable to add the portfolio", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
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
        <CirclePicker color={color} onChange={handleColorChange} />
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Portfolio
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PortfolioAddForm;
