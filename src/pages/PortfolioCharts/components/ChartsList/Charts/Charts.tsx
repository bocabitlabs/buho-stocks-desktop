import { Col, Row, Space, Spin } from "antd";
import PortfolioYearlyEvolutionChartNivo from "components/PortfolioYearlyEvolutionChartNivo/PortfolioYearlyEvolutionChartNivo";
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";
import { StringUtils } from "utils/string-utils";
import BrokersChartNivo from "./components/BrokersChartNivo/BrokersChartNivo";
import CurrenciesChartNivo from "./components/CurrenciesChartNivo/CurrenciesChartNivo";
import DividendsChart from "./components/DividendsChart/DividendsChart";
import InvestedChartNivo from "./components/InvestedChartNivo/InvestedChartNivo";
import PortfolioReturnChartNivo from "./components/PortfolioReturnChartNivo/PortfolioReturnChartNivo";
import PortfolioReturnChartPercentageNivo from "./components/PortfolioReturnChartPercentage/PortfolioReturnChartPercentageNivo";
import PortfolioValueChartNivo from "./components/PortfolioValueChartNivo/PortfolioValueChartNivo";
import SectorsChartNivo from "./components/SectorsChartNivo/SectorsChartNivo";
import SuperSectorsChartNivo from "./components/SuperSectorsChartNivo/SuperSectorsChartNivo";

interface Props {
  portfolio: IPortfolio;
  year: string;
  years?: number[];
}

export default function Charts({
  portfolio,
  year,
  years
}: Props): ReactElement {
  const [width, setWidth] = useState(window.innerWidth);
  const [data, setData] = useState<any[]>([]);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const getData = () => {
      return portfolio.companies
        .filter((company) => !company.closed)
        .map((company: ICompany) => ({
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
          superSectorName: company.superSectorName,
          broker: company.broker
        }));
    };
    const tempData = getData();
    setData(tempData);
  }, [portfolio.companies]);

  if (data.length > 0 && portfolio) {
    return (
      <Space direction="vertical">
        <Row>
          {years && years.length > 0 && (
            <PortfolioYearlyEvolutionChartNivo
              data={data}
              portfolio={portfolio}
              years={years}
            />
          )}
        </Row>
        <Row>
          {years && years.length > 0 && (
            <PortfolioReturnChartPercentageNivo
              data={data}
              portfolio={portfolio}
              years={years}
            />
          )}
        </Row>
        <Row>
          {years && years.length > 0 && (
            <PortfolioReturnChartNivo
              data={data}
              portfolio={portfolio}
              years={years}
            />
          )}
        </Row>
        <Row>
          <InvestedChartNivo data={data} portfolio={portfolio} />
        </Row>
        <Row>
          <PortfolioValueChartNivo data={data} portfolio={portfolio} />
        </Row>
        <Row>
          <DividendsChart data={data} portfolio={portfolio} width={width} />
        </Row>
        <Row>
          <Col span={12}>
            <CurrenciesChartNivo data={data} portfolio={portfolio} />
          </Col>
          <Col span={12}>
            <BrokersChartNivo data={data} portfolio={portfolio} width={width} />
          </Col>
        </Row>
        <Row>
          <SectorsChartNivo data={data} portfolio={portfolio} width={width} />
        </Row>
        <Row>
          <SuperSectorsChartNivo
            data={data}
            portfolio={portfolio}
            width={width}
          />
        </Row>
      </Space>
    );
  }

  return <Spin />;
}
