import { Col, Form, Row, Select, Statistic } from "antd";
import FetchStockPricesButton from "components/FetchStockPricesButton/FetchStockPricesButton";
import PortfolioYearlyEvolutionChartNivo from "components/PortfolioYearlyEvolutionChartNivo/PortfolioYearlyEvolutionChartNivo";
import { PortfoliosContext } from "contexts/portfolios";
import moment from "moment";
import React, { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PortfolioService from "services/portfolios/portfolios-service";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

export default function PortfolioStats(): ReactElement | null {
  const { portfolio } = useContext(PortfoliosContext);
  const [year, setYear] = useState("all");
  const [years, setYears] = useState<number[]>([]);
  const [dividendsPerYear, setDividendsPerYear] = useState<number>(0);
  const [investmentPerYear, setInvestmentPerYear] = useState<number>(0);
  const [dividendsPerMonth, setDividendsPerMonth] = useState<number>(0);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [
    portfolioReturnPercentage,
    setPortfolioReturnPercentage
  ] = useState<number>(0);

  const [data, setData] = useState<any[]>([]);
  const { Option } = Select;
  const { t } = useTranslation();

  const getValuesForAll = useCallback(() => {
    if (portfolio !== null) {
      console.debug("Get values for all");
      let newDividendsPerYear = portfolio.dividends.getDividends(true);
      let newDividendsPerMonth = 0;
      let newTotalInvestedPerYear = portfolio.investments.getTotalInvested(
        true
      );
      let newValue = portfolio.value.getPortfolioValue(true);
      const newPortfolioReturnPercentage = portfolio.returns.getReturnWithDividendsPercentage(
        true
      );
      setPortfolioReturnPercentage(newPortfolioReturnPercentage);

      setDividendsPerYear(newDividendsPerYear);
      setDividendsPerMonth(newDividendsPerMonth);
      setInvestmentPerYear(newTotalInvestedPerYear);
      setPortfolioValue(newValue);
    }
  }, [portfolio]);

  function onChange(value: any) {
    setYear(value);
    if (portfolio !== null) {
      if (value === "all") {
        console.debug("Set all");
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
  }, [portfolio, getValuesForAll]);

  useEffect(() => {
    if (portfolio !== null) {
      const getData = () => {
        return portfolio.companies.map((company: ICompany) => ({
          id: company.id,
          key: company.id,
          color: company.color,
          invested: company.investment.getTotalInvested(true),
          name: company.name,
          currencyName: company.currencyName,
          dividends: company.dividends.getDividendsAmount(true),
          portfolioCurrencySymbol: company.portfolioCurrencySymbol,
          portfolioValue: company.portfolioValue.getPortfolioValue(true),
          return: company.returns.getReturnWithDividendsPercentage(true),
          ticker: company.ticker,
          investedText: StringUtils.getAmountWithSymbol(
            company.investment.getTotalInvested(true),
            2,
            company.portfolioCurrencySymbol
          ),
          sectorName: company.sectorName,
          broker: company.broker
        }));
      };
      const tempData = getData();
      setData(tempData);
    }
  }, [portfolio]);

  const getValuesForYear = (value: number) => {
    if (portfolio !== null) {
      let newDividendsPerYear = portfolio.dividends.getDividendsForYear(
        value.toString(),
        true
      );
      let newDividendsPerMonth = portfolio.dividends.getMonthlyDividendsForYear(
        value.toString(),
        true
      );
      let newTotalInvestedPerYear = portfolio.investments.getTotalInvestedOnYear(
        value.toString(),
        true
      );
      let newValue = portfolio.value.getPortfolioValueForYear(
        value.toString(),
        true
      );

      const newPortfolioReturnPercentage = portfolio.returns.getReturnPercentageWithDividendsForYearCumulative(
        value.toString(),
        true
      );
      setPortfolioReturnPercentage(newPortfolioReturnPercentage);

      setDividendsPerYear(newDividendsPerYear);
      setDividendsPerMonth(newDividendsPerMonth);
      setInvestmentPerYear(newTotalInvestedPerYear);
      setPortfolioValue(newValue);
    }
  };

  if (portfolio === null) {
    return null;
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Form name="customized_form_controls" layout="inline">
          <Form.Item>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder={t("Select a year")}
              onChange={onChange}
              defaultValue="all"
            >
              <Option value="all">{t("All")}</Option>
              {years.map((element) => (
                <Option value={element} key={element}>
                  {element}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <FetchStockPricesButton
              companies={portfolio.companies}
              years={years}
            />
          </Form.Item>
        </Form>
      </div>
      <Row gutter={24}>
        <Col span={4}>
          <Statistic
            title={t("Invested")}
            value={investmentPerYear}
            suffix={portfolio.currencySymbol}
            precision={2}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title={t("Portfolio value")}
            value={portfolioValue}
            suffix={portfolio.currencySymbol}
            precision={2}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title={t("Dividends")}
            value={dividendsPerYear}
            suffix={portfolio.currencySymbol}
            precision={2}
          />
        </Col>
        {year !== "all" && (
          <Col span={5}>
            <Statistic
              title={t("Dividends per month")}
              value={dividendsPerMonth}
              suffix={portfolio.currencySymbol}
              precision={2}
            />
          </Col>
        )}
        <Col span={4}>
          <Statistic
            title={t("Return")}
            value={portfolioReturnPercentage}
            suffix={"%"}
            precision={2}
          />
        </Col>
      </Row>
      <Row>
        {years && years.length > 0 && (
          <PortfolioYearlyEvolutionChartNivo
            data={data}
            portfolio={portfolio}
            years={years}
            showTitle={false}
          />
        )}
      </Row>
    </div>
  );
}
