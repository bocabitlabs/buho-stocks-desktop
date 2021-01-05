import React, { ReactElement } from "react";
import { Button, Form, Input, message, TimePicker } from "antd";
import { CirclePicker } from "react-color";
import { useHistory } from "react-router-dom";

import MarketService from "services/market-service";

/**
 * Add a new Currency
 */
function MarketAddForm(): ReactElement {
  const [form] = Form.useForm();
  const key = "updatable";
  const history = useHistory();
  let color = "#607d8b";

  const handleAdd = (values: any) => {
    const { name, description, region, openTime, closeTime } = values;
    console.log(openTime);
    const market = {
      name,
      description,
      region,
      color,
      openTime: openTime.format("HH:mm"),
      closeTime: closeTime.format("HH:mm")
    };
    //Add the currency
    const added = MarketService.addMarket(market);
    if (added.changes) {
      history.push("/markets");
      message.success({ content: "Market has been added", key });
    } else {
      message.success({ content: "Unable to add the market", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    color = color.hex;
  };

  return (
    <Form form={form} name="basic" onFinish={handleAdd}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the market" }
        ]}
      >
        <Input type="text" placeholder="USA, EU, Japan..." />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: false }]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item
        name="region"
        label="region"
        rules={[{ required: true, message: "Please input the region" }]}
      >
        <Input type="text" placeholder="USA, EU, Japan..." />
      </Form.Item>
      <Form.Item
        name="openTime"
        label="Opening time"
        rules={[{ required: true, message: "Please input the opening time" }]}
      >
        {/* <Input type="text" placeholder="HH:mm" /> */}
        <TimePicker name="openTime" format="HH:mm" />
      </Form.Item>
      <Form.Item
        name="closeTime"
        label="Closing time"
        rules={[{ required: true, message: "Please input the closing time" }]}
      >
        {/* <Input type="time" placeholder="HH:mm" /> */}
        <TimePicker name="closeTime" format="HH:mm" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add market
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MarketAddForm;
