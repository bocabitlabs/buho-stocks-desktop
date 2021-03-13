import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Form, Input, message, TimePicker } from "antd";
import { CirclePicker } from "react-color";
import { useHistory } from "react-router-dom";

import { MarketsContext } from "contexts/markets";
import moment from "moment";

interface AddEditFormProps {
  marketId?: string;
}

function MarketAddEditForm({
  marketId
}: AddEditFormProps): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const [color, setColor] = useState("#607d8b");
  const key = "updatable";
  const {
    market,
    addMarket,
    fetchMarkets,
    getById: getMarketById,
    update: updateMarket
  } = useContext(MarketsContext);

  // useEffect(() => {
  //   if (marketId) {
  //     const newMarket = getMarketById(marketId);
  //     if (newMarket) {
  //       setColor(newMarket.color);
  //     }
  //   }
  // }, [marketId, getMarketById]);

  const handleSubmit = (values: any) => {
    const { name, description, region, openTime, closeTime } = values;
    const newMarket = {
      name,
      description,
      region,
      color,
      openTime: openTime.format("HH:mm"),
      closeTime: closeTime.format("HH:mm")
    };
    let changes = null;
    if (marketId) {
      changes = updateMarket(marketId, newMarket);
    } else {
      changes = addMarket(newMarket);
    }
    if (changes.changes) {
      fetchMarkets();
      if (!marketId) {
        message.success({ content: "Market has been added", key });
      } else {
        message.success({ content: "Market has been updated", key });
      }
      history.push("/markets");
    } else {
      message.success({ content: "Unable to add the market", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  };

  if (marketId && !market) {
    return null;
  }

  return (
    <Form
      form={form}
      name="basic"
      onFinish={handleSubmit}
      initialValues={{
        name: market?.name,
        description: market?.description,
        region: market?.region,
        openTime: market ? moment(market?.openTime, "HH:mm") : "",
        closeTime: market ? moment(market?.closeTime, "HH:mm") : ""
      }}
    >
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
        <CirclePicker color={color} onChange={handleColorChange} />
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
          {marketId ? "Update market" : "Add market"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MarketAddEditForm;
