import DividendUtils from "../../utils/dividend-utils";

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
    render: (text: string, record: any) => text
  },
  {
    title: "Accum. Shares",
    dataIndex: "accumulatedSharesNumber",
    key: "accumulatedSharesNumber",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Total invested",
    dataIndex: "investedAmount",
    key: "investedAmount",
    width: 70,
    render: (text: number, record: any) =>
      DividendUtils.getAmountWithSymbol(
        text.toFixed(2),
        // record.currencySymbol
        "$"
      )
  },
  {
    title: "Acum. investment",
    dataIndex: "accumulatedInvestment",
    key: "accumulatedInvestment",
    width: 70,
    render: (text: number, record: any) =>
      DividendUtils.getAmountWithSymbol(
        text.toFixed(2),
        // record.currencySymbol
        "$"
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
        children: DividendUtils.getAmountWithSymbol(
          text.toFixed(2),
          // record.currencySymbol
          "$"
        )
      };
    }
  },
  {
    title: "Acum. commission",
    dataIndex: "accumulatedInvestmentCommission",
    key: "accumulatedInvestmentCommission",
    width: 70,
    render(text: number, record: any) {
      return {
        props: {
          style: { background: "#fff1f0" }
        },
        children: DividendUtils.getAmountWithSymbol(
          text.toFixed(2),
          // record.currencySymbol
          "$"
        )
      };
    }
  },
  {
    title: "Total invested with commission",
    dataIndex: "ivestmentWithCommission",
    key: "ivestmentWithCommission",
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
    title: "Gross Dividends",
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
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "$"
        )
      };
    }
  },
  {
    title: "Net Dividends",
    dataIndex: "dividendsNet",
    key: "dividendsNet",
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
          "$"
        )
      };
    }
  },
  {
    title: "DPS",
    dataIndex: "dividendsPerShare",
    key: "dividendsPerShare",
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
          "$"
        )
      };
    }
  },
  {
    title: "Gross accumulated dividends",
    dataIndex: "accumulatedDividendsGross",
    key: "accumulatedDividendsGross",
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
          "$"
        )
      };
    }
  },
  {
    title: "Net accumulated dividends",
    dataIndex: "accumulatedDividendsNet",
    key: "accumulatedDividendsNet",
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
          "$"
        )
      };
    }
  },
  {
    title: "Stock price",
    dataIndex: "latestYearStockPrice",
    key: "latestYearStockPrice",
    width: 70,
    render: (text: string, record: any) =>
      DividendUtils.getAmountWithSymbol(
        text,
        // record.currencySymbol
        "$"
      )
  },
  {
    title: "Portfolio Value",
    dataIndex: "portfolioValue",
    key: "portfolioValue",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "$"
        )
      };
    }
  },
  {
    title: "Portfolio Value Inf.",
    dataIndex: "portfolioValueWithInflation",
    key: "portfolioValueWithInflation",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "$"
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

      return {
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "$"
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

      return {
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "$"
        )
      };
    }
  },
  {
    title: "Return %",
    dataIndex: "returnPercentage",
    key: "returnPercentage",
    width: 70,
    render(text: number, record: any) {
      console.log(text);
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "%"
        )
      };
    }
  },
  {
    title: "Accum. Return %",
    dataIndex: "accumulatedReturnPercentage",
    key: "accumulatedReturnPercentage",
    width: 70,
    render(text: number, record: any) {
      let newText: string = "0";
      if (text > 0) {
        newText = text.toFixed(2);
      }

      return {
        children: DividendUtils.getAmountWithSymbol(
          newText,
          // record.currencySymbol
          "%"
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
