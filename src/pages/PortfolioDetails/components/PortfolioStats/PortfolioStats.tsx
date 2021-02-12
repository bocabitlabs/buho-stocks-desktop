import { Col, Row, Select, Statistic } from "antd";
import { PortfoliosContext } from "contexts/portfolios";
import React, { ReactElement, useContext, useState } from "react";


export default function PortfolioStats(): ReactElement {
  const { portfolio } = useContext(PortfoliosContext);
  const [year, setyYear] = useState("all");

  const { Option } = Select;

  function onChange(value: any) {
    console.log(`selected ${value}`);
    setyYear(value);
  }
  let dividendsPerYear = 0;
  let dividendsPerMonth = 0;

  if (portfolio !== null) {
    dividendsPerYear = portfolio.getPortfolioDividends(year, true);
    dividendsPerMonth = portfolio.getMonthlyDividendsForYear(year, true);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: any) {
    console.log("search:", val);
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a year"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
        >
          <Option value="2018">2018</Option>
          <Option value="2019">2019</Option>
          <Option value="2020">2020</Option>
          <Option value="all">All</Option>
        </Select>
      </div>
      <Row gutter={24}>
        <Col span={6}>
          <Statistic
            title="Dividends"
            value={dividendsPerYear}
            suffix={portfolio?.currencySymbol}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Dividends per month"
            value={dividendsPerMonth}
            suffix={portfolio?.currencySymbol}
            precision={2}
          />
        </Col>
      </Row>
    </div>
  );
}
