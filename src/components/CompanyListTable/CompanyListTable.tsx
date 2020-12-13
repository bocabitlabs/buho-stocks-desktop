import { Table } from "antd";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import CompanyService from "../../services/company-service";
import { CompanyTotalProps } from "../../types/company";
import computeCompanyData from "./logic/table-logic";
import getColumns from "./table-columns";

interface IProps {
  portfolioId: string;
}

export default function CompanyListTable({ portfolioId }: IProps) {
  const { companies } = useContext(CompaniesContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [companyData, setCompanyData] = useState<CompanyTotalProps[]>([]);


  const history = useHistory();

  useEffect(() => {
    const results = computeCompanyData(companies);
    setCompanyData(results);
  }, [setCompanyData, companies]);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function confirm(recordId: string) {
    const result = new CompanyService().deleteById(recordId);
    if (result === "OK") {
      history.push({
        pathname: `/portfolios/:portfolioId`,
        state: {
          message: { type: "success", text: "Company has been deleted" }
        }
      });
    }
  }

  const getData = () => {
    const columnData = companyData.map((company: CompanyTotalProps) => ({
      id: company.id,
      key: company.id,
      name: company.name,
      ticker: company.ticker,
      sector: company.sector,
      currency: company.currency,
      // color: company.color,
      sharesNumber: company.sharesNumber,
      investedAmount: company.investedAmount,
      commission: company.commission,
      averagePrice: company.averagePrice,
      averagePriceWithoutCommission: company.averagePriceWithoutCommission,
      commissionPercentage: company.commissionPercentage,
      lastStockPrice: company.lastStockPrice,
      portfolioValue: company.portfolioValue,
      portfolioValueWithInflation: company.portfolioValueWithInflation,
      accumReturn: company.accumReturn,
      accumReturnPercentage: company.accumReturnPercentage,
      accumulatedDividendsGross: company.accumulatedDividendsGross,
      accumulatedDividendsNet: company.accumulatedDividendsNet,
      returnWithDividends: company.returnWithDividends,
      returnWithDividendsPercentage: company.returnWithDividendsPercentage,
      rpd: company.dividendsReturnPercentage,
      yoc: company.yoc
    }));
    return columnData;
  };
  console.log(companies.length)
  return (
    <Table
        size="small"
        style={{ maxWidth: `max(500px, ${width - 300}px)` }}
        className={'company-table'}
        scroll={{ x: 800 }}
        bordered
        columns={getColumns({portfolioId, confirm})}
        dataSource={getData()}
      />
  );
}
