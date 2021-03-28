import { Col, Row, Select, Statistic, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CompanyService from "services/company-service";
import { ICompany } from "types/company";
import { IStockPrice } from "types/stock-price";
import { StringUtils } from "utils/string-utils";
import CompanyCharts from "./CompanyCharts/CompanyCharts";

interface Props {
  company: ICompany;
}

export default function Stats({ company }: Props): React.ReactElement | null {
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState("all");
  const [accumulatedShares, setAccumulatedShares] = useState(0);
  const [dividendsAmount, setDividendsAmount] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [companyReturn, setCompanyReturn] = useState(0);
  const [returnPercentage, setReturnPercentage] = useState(0);
  const [accumulatedInvestment, setAccumulatedInvestment] = useState(0)
  const [latestStockPrice, setLatestStockPrice] = useState<IStockPrice|null>(null)

  // const companyRpd = company.getRpd(true);
  // const companyYoc = company.getYoc(true);

  const { Option } = Select;

  function onChange(value: any) {
    console.log(`ONCHANGE ${value}`);
    setYear(value);
    if (company !== null) {
      if (value === "all") {
        getValuesForAll();
      } else {
        getValuesForYear(value);
      }
    }
  }

  useEffect(() => {
    if (company !== null) {
      const currentDate = moment().format("YYYY");
      const firstTransaction = CompanyService.getFirstTransaction(company.id);
      const firstDate = moment(firstTransaction.transactionDate).format("YYYY");
      let newYears = [];
      for (let index = +currentDate; index >= +firstDate; index--) {
        newYears.push(index);
      }
      setYears(newYears);
      getValuesForAll();
    }
  }, [company]);

  const getValuesForAll = () => {
    if (company !== null) {
      const newAccumulatedShares = company.getSharesCount();
      setAccumulatedShares(newAccumulatedShares);

      const newDividendsAmount = company.getDividendsAmount(true);
      setDividendsAmount(newDividendsAmount);

      const newTotalInvested = company.getTotalInvested(true);
      setAccumulatedInvestment(newTotalInvested);

      const newPorfolioValue = company.getPortfolioValue(true);
      setPortfolioValue(newPorfolioValue);
      const newCompanyReturn = company.getReturnWithDividends(true);
      setCompanyReturn(newCompanyReturn);
      const newReturnPercentage = company.getReturnWithDividendsPercentage(true);
      setReturnPercentage(newReturnPercentage);

      const newStockPrice = company.getLatestStockPrice(true);
      setLatestStockPrice(newStockPrice);
    }
  };

  const getValuesForYear = (value: number) => {
    if (company !== null) {
      const newAccumulatedShares = company.getCumulativeSharesCountUntilYear(
        value.toString()
      );
      setAccumulatedShares(newAccumulatedShares);

      const newDividendsAmount = company.getDividendsAmountForYear(
        value.toString(),
        true
      );
      setDividendsAmount(newDividendsAmount);

      const newAccumulatedInvestment = company.getTotalInvestedUntilYear(value.toString())
      setAccumulatedInvestment(newAccumulatedInvestment);

      const newPortfolioValue = company.getPortfolioValueForYear(
        value.toString(),
        true
      );
      setPortfolioValue(newPortfolioValue);
      const newCompanyReturn = company.getReturnWithDividendsForYear(value.toString(), true);
      setCompanyReturn(newCompanyReturn);

      const newReturnPercentage = company.getReturnPercentageForYear(value.toString(), true);
      setReturnPercentage(newReturnPercentage);

      const newStockPrice = company.getLatestStockPriceForYear(value.toString(), true);
      setLatestStockPrice(newStockPrice);

    }
  };

  let positive: BaseType = "success";
  if (returnPercentage < 0) {
    positive = "danger";
  }
  if (returnPercentage === 0) {
    positive = "secondary";
  }

  const formattedReturnPercentage = StringUtils.getAmountWithSymbol(
    returnPercentage,
    2,
    "%"
  );

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
        {/* <Col span={4}>
          <Statistic title="New Shares" value={sharesCount} />
        </Col> */}
        <Col span={6}>
          <Statistic title="Accum. Shares" value={accumulatedShares} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Dividends"
            value={dividendsAmount}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col>
        {/* <Col span={4}>
          <Statistic
            title="Invested"
            value={totalInvested}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col> */}
        <Col span={6}>
          <Statistic
            title="Accum. invest"
            value={accumulatedInvestment}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col>
        {latestStockPrice ? (
          <Col span={6}>
            <Statistic
              title="Stock Price"
              value={latestStockPrice.price}
              suffix={company.portfolioCurrencySymbol}
              precision={2}
            />
            <Typography.Text type="secondary">
              {moment(new Date(latestStockPrice.transactionDate)).format(
                "DD/MM/YYYY"
              )}
            </Typography.Text>
          </Col>
        ) : (
          <Col span={6}>
            <Statistic title="Stock Price" value={"Not set"} />
          </Col>
        )}
        <Col span={6}>
          <Statistic
            title="Portfolio Value"
            value={portfolioValue}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Return w. div"
            value={companyReturn}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
          <Typography.Text type={positive}>
            {formattedReturnPercentage}
          </Typography.Text>
        </Col>
        {/* <Col span={6}>
          {isNaN(companyRpd) ? (
            <Statistic title="RPD" value={"Not set"} />
          ) : (
            <Statistic
              title="RPD"
              value={companyRpd}
              suffix="%"
              precision={2}
            />
          )}
        </Col> */}
        {/* <Col span={6}>
          {isNaN(companyYoc) ? (
            <Statistic title="YOC" value={"Not set"} />
          ) : (
            <Statistic
              title="YOC"
              value={companyYoc}
              suffix="%"
              precision={2}
            />
          )}
        </Col> */}
      </Row>
      <CompanyCharts company={company} year={year} years={years} />

    </div>
  );
}
