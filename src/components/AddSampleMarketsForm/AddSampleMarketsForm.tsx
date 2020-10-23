import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form } from "antd";
import { addMarket } from "../../daos/market-dao";
import sampleMarkets from "./sample-markets";
import { MarketItemProps } from "../../types/market";
/**
 * Add a new Currency
 */
function AddSampleMarketsForm(): ReactElement {
  const [form] = Form.useForm();

  const [markets, setMarkets] = useState(sampleMarkets);

  const handleAddMarkets = useCallback(async () => {
    markets.forEach((market: MarketItemProps) => {
      addMarket(market, setMarkets);
    });
  }, [markets]);

  return (
    <Form form={form} name="basic" onFinish={handleAddMarkets}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Sample Markets
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSampleMarketsForm;
