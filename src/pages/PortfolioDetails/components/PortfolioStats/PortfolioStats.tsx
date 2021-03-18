import { Col, Row, Select, Statistic } from "antd";
import { PortfoliosContext } from "contexts/portfolios";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import PortfolioService from "services/portfolio-service";

export default function PortfolioStats(): ReactElement | null {
  const { portfolio } = useContext(PortfoliosContext);
  const [year, setYear] = useState("all");
  const [years, setYears] = useState<number[]>([]);
  const [dividendsPerYear, setDividendsPerYear] = useState<number>(0);
  const [investmentPerYear, setInvestmentPerYear] = useState<number>(0);
  const [dividendsPerMonth, setDividendsPerMonth] = useState<number>(0);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);

  const { Option } = Select;

  function onChange(value: any) {
    console.log(`ONCHANGE ${value}`);
    setYear(value);
    if (portfolio !== null) {
      if (value === "all") {
        getValuesForAll();
      } else {
        getValuesForYear(value);
      }
    }
  }

  useEffect(() => {
    if (portfolio !== null) {
      const currentDate = moment().format("YYYY");
      const firstTransaction = PortfolioService.getFirstTransaction(
        portfolio.id
      );
      const firstDate = moment(firstTransaction.transactionDate).format("YYYY");
      let newYears = [];
      for (let index = +currentDate; index >= +firstDate; index--) {
        newYears.push(index);
      }
      setYears(newYears);
      getValuesForAll();
    }
  }, [portfolio]);

  const getValuesForAll = () => {
    if (year === "all" && portfolio !== null) {
      let newDividendsPerYear = portfolio.getAllPortfolioDividends(true);
      let newDividendsPerMonth = 0;
      let newTotalInvestedPerYear = portfolio.getTotalInvested(true);
      let newValue = portfolio.getPortfolioValue(true);

      setDividendsPerYear(newDividendsPerYear);
      setDividendsPerMonth(newDividendsPerMonth);
      setInvestmentPerYear(newTotalInvestedPerYear);
      setPortfolioValue(newValue);
    }
  };

  const getValuesForYear = (value: number) => {
    if (portfolio !== null) {
      let newDividendsPerYear = portfolio.getPortfolioDividends(
        value.toString(),
        true
      );
      let newDividendsPerMonth = portfolio.getMonthlyDividendsForYear(
        value.toString(),
        true
      );
      let newTotalInvestedPerYear = portfolio.getTotalInvestedForYear(
        value.toString(),
        true
      );
      console.info(newDividendsPerYear);
      console.info(newDividendsPerMonth);

      setDividendsPerYear(newDividendsPerYear);
      setDividendsPerMonth(newDividendsPerMonth);
      setInvestmentPerYear(newTotalInvestedPerYear);
    }
  };

  if (portfolio === null) {
    return null;
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a year"
          onChange={onChange}
          defaultValue="all"
        >
          <Option value="all">All</Option>
          {years.map((element) => (
            <Option value={element} key={element}>
              {element}
            </Option>
          ))}
        </Select>
      </div>
      <Row gutter={24}>
        <Col span={6}>
          <Statistic
            title="Invested"
            value={investmentPerYear}
            suffix={portfolio.currencySymbol}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Portfolio Value"
            value={portfolioValue}
            suffix={portfolio.currencySymbol}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Dividends"
            value={dividendsPerYear}
            suffix={portfolio.currencySymbol}
            precision={2}
          />
        </Col>
        {year !== "all" && (
          <Col span={6}>
            <Statistic
              title="Dividends per month"
              value={dividendsPerMonth}
              suffix={portfolio.currencySymbol}
              precision={2}
            />
          </Col>
        )}
      </Row>
    </div>
  );
}
