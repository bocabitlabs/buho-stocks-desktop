import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form } from "antd";
import MarketService from "services/market-service";
import sampleMarkets from "./sample-markets";
import { Market } from "types/market";
/**
 * Add a new Currency
 */
function AddSampleMarketsForm(): ReactElement {
  const [form] = Form.useForm();

  const [markets] = useState(sampleMarkets);

  const handleAddMarkets = useCallback(async () => {
    markets.forEach((market: Market) => {
      new MarketService().addMarket(market);
    });
  }, [markets]);

  return (
    <Form form={form} name="basic" onFinish={handleAddMarkets}>
      <Form.Item label="Add sample markets">
        <Button type="primary" htmlType="submit">
          Add Sample Markets
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSampleMarketsForm;
