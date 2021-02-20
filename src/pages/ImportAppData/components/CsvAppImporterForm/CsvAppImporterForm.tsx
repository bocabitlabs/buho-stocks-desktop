import { Button, Checkbox, Form, Typography } from "antd";
import React, { ReactElement } from "react";

interface Props {
  importStarted: boolean;
  onFinish: (values: any) => void;
}

export default function CsvAppImporterForm({
  onFinish,
  importStarted
}: Props): ReactElement {
  return (
    <Form onFinish={onFinish}>
      <Typography.Text>
        Select below all the elements that you want to import. All the elements
        of that type will be added <strong>if they don't exist</strong>.
      </Typography.Text>
      <Form.Item name="checkbox" label="Elements to import">
        <Checkbox.Group>
          <Checkbox
            value="sectors"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Sectors
          </Checkbox>
          <Checkbox
            value="currencies"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Currencies
          </Checkbox>
          <Checkbox
            value="markets"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Markets
          </Checkbox>
          <Checkbox
            value="portfolios"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Portfolios
          </Checkbox>
          <Checkbox
            value="companies"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Companies
          </Checkbox>
          <Checkbox
            value="shares"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Shares
          </Checkbox>
          <Checkbox
            value="dividends"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Dividends
          </Checkbox>
          <Checkbox
            value="rights"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Rights
          </Checkbox>
          <Checkbox
            value="inflation"
            style={{ lineHeight: "32px" }}
            disabled={importStarted}
          >
            Inflation
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={importStarted}>
          Start import
        </Button>
      </Form.Item>
    </Form>
  );
}
