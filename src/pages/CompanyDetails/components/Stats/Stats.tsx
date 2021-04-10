import { Col, Form, Row, Select, Statistic, Switch, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
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
  const [accumulatedInvestment, setAccumulatedInvestment] = useState(0);
  const [latestStockPrice, setLatestStockPrice] = useState<IStockPrice | null>(
    null
  );
  const [displayGrossValue, setDisplayGrossValue] = useState("net");

  // const companyRpd = company.getRpd(true);
  // const companyYoc = company.getYoc(true);

  const { Option } = Select;

  const getValuesForAll = useCallback(
    (withCommission = true) => {
      if (company !== null) {
        const newAccumulatedShares = company.shares.getSharesCount();
        setAccumulatedShares(newAccumulatedShares);

        const newDividendsAmount = company.dividends.getDividendsAmount(
          true,
          withCommission
        );
        setDividendsAmount(newDividendsAmount);

        const newTotalInvested = company.investment.getTotalInvested(true);
        setAccumulatedInvestment(newTotalInvested);

        const newPorfolioValue = company.portfolioValue.getPortfolioValue(true);
        setPortfolioValue(newPorfolioValue);
        const newCompanyReturn = company.returns.getReturnWithDividends(
          true,
          withCommission
        );
        setCompanyReturn(newCompanyReturn);
        const newReturnPercentage = company.returns.getReturnWithDividendsPercentage(
          true,
          withCommission
        );
        setReturnPercentage(newReturnPercentage);

        const newStockPrice = company.prices.getLatestStockPrice(true);
        setLatestStockPrice(newStockPrice);
      }
    },
    [company]
  );

  function onChange(value: any) {
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
  }, [company, getValuesForAll]);

  const getValuesForYear = (value: number, withCommission = true) => {
    if (company !== null) {
      const newAccumulatedShares = company.shares.getCumulativeSharesCountUntilYear(
        value.toString()
      );
      setAccumulatedShares(newAccumulatedShares);

      const newDividendsAmount = company.dividends.getDividendsAmountForYear(
        value.toString(),
        true,
        withCommission
      );
      setDividendsAmount(newDividendsAmount);

      const newAccumulatedInvestment = company.investment.getTotalInvestedUntilYear(
        value.toString(),
        true
      );
      setAccumulatedInvestment(newAccumulatedInvestment);

      const newPortfolioValue = company.portfolioValue.getPortfolioValueForYear(
        value.toString(),
        true
      );
      setPortfolioValue(newPortfolioValue);
      const newCompanyReturn = company.returns.getReturnWithDividendsForYear(
        value.toString(),
        true,
        withCommission
      );
      setCompanyReturn(newCompanyReturn);

      const newReturnPercentage = company.returns.getReturnPercentageForYearWithDiviends(
        value.toString(),
        true,
        withCommission
      );
      setReturnPercentage(newReturnPercentage);

      const newStockPrice = company.prices.getLatestStockPriceForYear(
        value.toString(),
        true
      );
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

  const getNewValues = (includeCommissions: boolean) => {
    if (year === "all") {
      getValuesForAll(includeCommissions);
    } else {
      getValuesForYear(+year, includeCommissions);
    }
  };

  const toggleNet = () => {
    let newValue = "net";
    if (displayGrossValue === "net") {
      newValue = "gross";
    }
    const includeCommissions = newValue === "net" ? true : false;
    getNewValues(includeCommissions);

    setDisplayGrossValue(newValue);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Form name="customized_form_controls" layout="inline">
          <Form.Item>
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
          </Form.Item>
          <Form.Item>
            <Switch
              checkedChildren="Show gross values"
              unCheckedChildren="Show net values"
              defaultChecked={displayGrossValue === "gross"}
              onChange={toggleNet}
            />
          </Form.Item>
        </Form>
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
