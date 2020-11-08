import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form, Input, TimePicker } from "antd";
import { CirclePicker } from "react-color";

import MarketService from "../../services/market-service";

/**
 * Add a new Currency
 */
function AddMarketForm(): ReactElement {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const [color, setColor] = useState("#607d8b");

  const handleAdd = useCallback(async (values) => {
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
    console.log(market);
    //Add the currency
    new MarketService().addMarket(market, setResult);
  }, [color]);

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
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
        <TimePicker name="closeTime" format="HH:mm"/>
      </Form.Item>
      {JSON.stringify(result)}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add market
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddMarketForm;
