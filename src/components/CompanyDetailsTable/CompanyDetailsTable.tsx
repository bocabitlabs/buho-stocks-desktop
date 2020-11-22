import { Table } from "antd";
import React, { useEffect, useState } from "react";
import DividendService from "../../services/dividend-service";
import ShareService from "../../services/share-service";
import { YearlyOperationsFields } from "../../types/company";
import { YearlyDividendFields } from "../../types/dividend";
import { YearlyShareFields } from "../../types/share";
import { DividendUtils } from "../../utils/dividend-utils";

interface IProps {
  portfolioId: string;
  companyId: string;
}

const computeYearlyData = (
  shares: YearlyShareFields[] | [],
  dividends: YearlyDividendFields[] | []
) => {
  let resultArray: YearlyOperationsFields[] = [];
  console.log("Computing yearly data");
  console.log(`Initial shares`, shares);
  console.log(`Initial dividends:`, dividends);

  let accumulativeSharesNumber = 0;

  let accumulativeBuyTotal = 0;
  let accumulativeSellTotal = 0;

  let accumulativeBuyCommission = 0;
  let accumulativeSellCommission = 0;

  // Generate the columns
  for (let index = 0; index < shares.length; index++) {
    const share = shares[index] as YearlyOperationsFields;
    const year = share.year;

    accumulativeBuyTotal += share.buyTotal;
    share.accumulativeBuyTotal = accumulativeBuyTotal;

    accumulativeSellTotal += share.sellTotal;
    share.accumulativeSellTotal = accumulativeSellTotal;

    accumulativeBuyCommission += share.buyCommission;
    share.accumulativeBuyCommission = accumulativeBuyCommission;

    accumulativeSellCommission += share.sellCommission;
    share.accumulativeSellCommission = accumulativeSellCommission;

    accumulativeSharesNumber += share.buySharesCount - share.sellSharesCount;
    share.accumulativeSharesNumber = accumulativeSharesNumber;

    let averagePrice = share.buyTotal / share.buySharesCount;
    share.averagePrice = averagePrice;

    let totalWithCommission = share.buyTotal + share.buyCommission;
    share.totalWithCommission = totalWithCommission;

    let accumulatedDividendTotal = 0;
    let accumulatedDividendNet = 0;

    for (let index = 0; index < dividends.length; index++) {
      const dividend = dividends[index];
      if (dividend.year === year) {
        console.log("Shares and Dividends year match");
        share.dividendsTotal = dividend.dividendsTotal;
        share.dividendsNet = dividend.dividendsNet;
        share.dps = dividend.dividendsTotal / dividend.sharesNumber;
        accumulatedDividendTotal += dividend.dividendsTotal;
        accumulatedDividendNet += dividend.dividendsNet;
      }
      if (parseInt(dividend.year) < parseInt(year)) {
        accumulatedDividendTotal += dividend.dividendsTotal;
        accumulatedDividendNet += dividend.dividendsNet;
      }
    }

    share.accumulatedDividendTotal = accumulatedDividendTotal;
    share.accumulatedDividendNet = accumulatedDividendNet;

    resultArray.push(share);
  }

  return resultArray;
};

export default function CompanyDetailsTable({
  portfolioId,
  companyId
}: IProps) {
  const [shares, setShares] = useState<YearlyOperationsFields[]>([]);

  useEffect(() => {
    const sharesResults = new ShareService().getSharesPerYearByCompanyId(
      companyId
    );
    const dividendsResults = new DividendService().getDividendsPerYearByCompanyId(
      companyId
    );

    const results = computeYearlyData(sharesResults, dividendsResults);
    console.log(results);
    setShares(results);
  }, [setShares, companyId]);

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 70,
      fixed: "left" as "left", // cast fixed
      render: (text: string, record: any) => text
    },
    {
      title: "Number of Shares",
      dataIndex: "totalShares",
      key: "totalShares",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Accumulated Shares",
      dataIndex: "accumulativeSharesNumber",
      key: "accumulativeSharesNumber",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Total invested",
      dataIndex: "totalInvested",
      key: "totalInvested",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Acum. invested",
      dataIndex: "accumulativeBuyTotal",
      key: "accumulativeBuyTotal",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Average price",
      dataIndex: "averagePrice",
      key: "averagePrice",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Commission",
      dataIndex: "averagePrice",
      key: "averagePrice",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Acum. commission",
      dataIndex: "averagePrice",
      key: "averagePrice",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Total with commission",
      dataIndex: "totalWithCommission",
      key: "totalWithCommission",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Raw Dividends",
      dataIndex: "dividendsTotal",
      key: "dividendsTotal",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Net Dividends",
      dataIndex: "dividendsNet",
      key: "dividendsNet",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "DPS",
      dataIndex: "dps",
      key: "dps",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Raw accumulated dividends",
      dataIndex: "accumulatedDividendTotal",
      key: "accumulatedDividendTotal",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Raw net dividends",
      dataIndex: "accumulatedDividendNet",
      key: "accumulatedDividendNet",
      width: 70,
      render: (text: string, record: any) => text
    }
    // {
    //   title: "Total invested in base currency",
    //   dataIndex: "totalInvestedBaseCurrency",
    //   key: "totalInvestedBaseCurrency",
    //   width: 70,
    //   render: (text: string, record: any) => text
    // }
  ];

  const getData = () => {
    const dividentUtils = new DividendUtils();

    const shares2 = shares.map(
      (share: YearlyOperationsFields, index: number) => ({
        id: index.toString(),
        key: index.toString(),
        name: "share",
        year: share.year.toString(),
        totalShares: share.buySharesCount - share.sellSharesCount,
        accumulativeSharesNumber: share.accumulativeSharesNumber,
        totalInvested: share.buyTotal,
        accumulativeBuyTotal: share.accumulativeBuyTotal,
        averagePrice: share.averagePrice,
        totalWithCommission: share.totalWithCommission,
        dividendsTotal: share.dividendsTotal,
        dividendsNet: share.dividendsNet,
        dps: share.dps,
        accumulatedDividendTotal: share.accumulatedDividendTotal,
        accumulatedDividendNet: share.accumulatedDividendNet
        // totalCommission: share.buyCommission + share.sellCommission,
        // operationsCount: share.operationsCount,
        // totalInvested: share.buyTotal,
        // totalInvestedBaseCurrency: share.buyTotalBaseCurrency
        // operationDate: dividend.operationDate,
        // priceShare: dividentUtils.getAmountWithSymbol(
        //   dividend.priceShare,
        //   dividend.currencySymbol
        // ),
        // commission: dividentUtils.getAmountWithSymbol(
        //   dividend.commission,
        //   dividend.currencySymbol
        // ),
        // notes: dividend.notes
      })
    );
    return shares2;
  };

  return (
    <div>
      <>
        <Table
          size="small"
          style={{ maxWidth: "max(500px, 76vw)" }}
          scroll={{ x: 800 }}
          bordered
          columns={columns}
          dataSource={getData()}
        />
      </>
    </div>
  );
}
