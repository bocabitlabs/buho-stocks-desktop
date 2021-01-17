import Text from "antd/lib/typography/Text";
import { DividendUtils } from "utils/dividend-utils";

export const columns = [
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
    render: (text: string, record: any) => (
      <div>
        <Text>{text}</Text>
      </div>
    )
  },
  {
    title: "Total invested",
    dataIndex: "ivestmentWithCommission",
    key: "ivestmentWithCommission",
    width: 70,
    render: (text: number, record: any) => (
      <div>
        <Text>
          {DividendUtils.getAmountWithSymbol(
            text.toFixed(2),
            // record.currencySymbol
            "$"
          )}
        </Text>
        <br />
        <Text type="secondary">
          {DividendUtils.getAmountWithSymbol(
            record.accumulatedInvestment.toFixed(2),
            // record.currencySymbol
            "$"
          )}
        </Text>
      </div>
    )
  },
  {
    title: "Commission",
    dataIndex: "investmentCommission",
    key: "investmentCommission",
    width: 70,
    render(text: number, record: any) {
      return {
        props: {
          style: { background: "#fff1f0" }
        },
        children: (
          <div>
            <Text>
              {DividendUtils.getAmountWithSymbol(
                text.toFixed(2),
                // record.currencySymbol
                "$"
              )}
            </Text>
            <br />
            <Text type="secondary">
              {DividendUtils.getAmountWithSymbol(
                record.accumulatedInvestmentCommission.toFixed(2),
                // record.currencySymbol
                "$"
              )}
            </Text>
          </div>
        )
      };
    }
  },
  {
    title: "Average price",
    dataIndex: "averagePrice",
    key: "averagePrice",
    width: 70,
    render: (text: number, record: any) => {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return DividendUtils.getAmountWithSymbol(
        newText,
        // record.currencySymbol
        "$"
      );
    }
  },
  {
    title: "Dividends",
    dataIndex: "dividendsGross",
    key: "dividendsGross",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        props: {
          style: { background: "#e6f7ff" }
        },
        children: (
          <div>
            <Text>
              {DividendUtils.getAmountWithSymbol(
                newText,
                // record.currencySymbol
                "$"
              )}
            </Text>
            <br />
            <Text type="secondary">
              {DividendUtils.getAmountWithSymbol(
                record.dividendsNet.toFixed(2),
                // record.currencySymbol
                "$"
              )}
            </Text>
          </div>
        )
      };
    }
  },
  {
    title: "Stock price",
    dataIndex: "latestYearStockPrice",
    key: "latestYearStockPrice",
    width: 70,
    render: (text: string, record: any) => {
      if (text === undefined) {
        return "-";
      }

      return (
        <div>
          <Text>
            {DividendUtils.getAmountWithSymbol(
              text,
              // record.currencySymbol
              "$"
            )}
          </Text>
        </div>
      );
    }
  },
  {
    title: "Portfolio Value",
    dataIndex: "portfolioValue",
    key: "portfolioValue",
    width: 70,
    render(text: number, record: any) {

      if(record.latestYearStockPrice === undefined){
        return "-"
      }

      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      let newTextWithInf: string = "0";
      if (text > 0) {
        newTextWithInf = record.portfolioValueWithInflation.toFixed(2);
      }

      return {
        children: (
          <div>
            <Text>
              {DividendUtils.getAmountWithSymbol(
                newText,
                // record.currencySymbol
                "$"
              )}
            </Text>
            <br />
            <Text type="secondary">
              {DividendUtils.getAmountWithSymbol(
                newTextWithInf,
                // record.currencySymbol
                "$"
              )}
            </Text>
          </div>
        )
      };
    }
  },
  {
    title: "Return",
    dataIndex: "yearReturn",
    key: "yearReturn",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      let newTextWithInf: string = "0";
      if (text > 0) {
        newTextWithInf = record.returnPercentage.toFixed(2);
      }

      return {
        children: (
          <div>
            <Text>
              {DividendUtils.getAmountWithSymbol(
                newText,
                // record.currencySymbol
                "$"
              )}
            </Text>
            <br />
            <Text type="secondary">
              {DividendUtils.getAmountWithSymbol(
                newTextWithInf,
                // record.currencySymbol
                "%"
              )}
            </Text>
          </div>
        )
      };
    }
  },
  {
    title: "Acum. Return",
    dataIndex: "accumulatedReturn",
    key: "accumulatedReturn",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      let newTextWithInf: string = "0";
      if (text > 0) {
        newTextWithInf = record.accumulatedReturnPercentage.toFixed(2);
      }

      return {
        children: (
          <div>
            <Text>
              {DividendUtils.getAmountWithSymbol(
                newText,
                // record.currencySymbol
                "$"
              )}
            </Text>
            <br />
            <Text type="secondary">
              {DividendUtils.getAmountWithSymbol(
                newTextWithInf,
                // record.currencySymbol
                "%"
              )}
            </Text>
          </div>
        )
      };
    }
  },
  {
    title: "Dividend Return %",
    dataIndex: "dividendsReturnPercentage",
    key: "dividendsReturnPercentage",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        props: {
          style: { background: "#e6f7ff" }
        },
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "%"
        )
      };
    }
  },
  {
    title: "YOC",
    dataIndex: "yoc",
    key: "yoc",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        props: {
          style: { background: "#e6f7ff" }
        },
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "%"
        )
      };
    }
  }
];
