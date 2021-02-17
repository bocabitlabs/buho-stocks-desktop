import { Button, Checkbox, Form, Space, Typography } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";

export default function CsvAppImporter(): ReactElement {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  const handleOnFileLoad = (data: any) => {
    console.log(data);
    setData(data);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const onFinish = (values: any) => {
    const { checkbox } = values;
    console.log("Importing...");
  };

  return (
    <Space direction="vertical">
      <CSVReader onDrop={handleOnFileLoad} onError={handleOnError} noDrag>
        <span>Click to upload.</span>
      </CSVReader>
      {data && data.length > 0 && (
        <Form onFinish={onFinish}>
          <Typography.Text>
            Select below all the elements that you want to import. All the
            elements of that type will be added{" "}
            <strong>if they don't exist</strong>.
          </Typography.Text>
          <Form.Item name="checkbox" label="Elements to import">
            <Checkbox.Group>
              <Checkbox value="portfolios" style={{ lineHeight: "32px" }}>
                Portfolios
              </Checkbox>
              <Checkbox value="companies" style={{ lineHeight: "32px" }}>
                Companies
              </Checkbox>
              <Checkbox value="shares" style={{ lineHeight: "32px" }}>
                Shares
              </Checkbox>
              <Checkbox value="dividends" style={{ lineHeight: "32px" }}>
                Dividends
              </Checkbox>
              <Checkbox value="rights" style={{ lineHeight: "32px" }}>
                Rights
              </Checkbox>
              <Checkbox value="sectors" style={{ lineHeight: "32px" }}>
                Sectors
              </Checkbox>
              <Checkbox value="currencies" style={{ lineHeight: "32px" }}>
                Currencies
              </Checkbox>
              <Checkbox value="markets" style={{ lineHeight: "32px" }}>
                Markets
              </Checkbox>
              <Checkbox value="inflation" style={{ lineHeight: "32px" }}>
                Inflation
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Start import
            </Button>
          </Form.Item>
        </Form>
      )}
    </Space>
  );
}
