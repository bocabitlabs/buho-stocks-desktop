import React, { ReactElement } from "react";
import { Button, Checkbox, Form } from "antd";
import CompanyService from "services/company-service";

export default function ExportDataForm(): ReactElement {
  const onFinish = (values: any) => {
    const {
      portfolios,
      companies,
      shares,
      dividends,
      rights,
      sectors,
      currencies,
      markets,
      inflation
    } = values;

    const companiesResults = new CompanyService().exportAll();
    console.log(companiesResults)
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="checkbox-group" label="Checkbox.Group">
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

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
