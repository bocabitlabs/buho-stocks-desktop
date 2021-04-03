import { ResponsiveLine } from "@nivo/line";
import { Spin, Typography } from "antd";
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { IPortfolio } from "types/portfolio";
import { StringUtils } from "utils/string-utils";

interface Props {
  data: any;
  portfolio: IPortfolio;
  years: number[];
  showTitle?: boolean;
}

export default function PortfolioYearlyEvolutionChartNivo({
  data,
  portfolio,
  years,
  showTitle=true
}: Props): ReactElement {
  const [chartData, setChartData] = useState<any[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      const info = document.getElementById("sidebar") as HTMLDivElement;

      if (info !== null) {
        setSidebarWidth(info.offsetWidth);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const tempData = [...data];
    console.debug("sorting tempdata portfolio value", tempData);

    if (portfolio) {
      const portfolioValueData: any = [];
      const accumInvestmentData: any = [];
      const dividendsData: any = [];
      const portfolioValueWithDividends: any = [];

      const years1 = [...years];
      years1.reverse().forEach((element) => {
        const tempPortfolioValue = portfolio.getPortfolioValueForYear(
          element.toString(),
          true
        );
        portfolioValueData.push({
          x: element.toString(),
          y: tempPortfolioValue
        });

        const tempAccumInvestment = portfolio.getTotalInvestedUntilYear(
          element.toString(),
          true
        );
        accumInvestmentData.push({
          x: element.toString(),
          y: tempAccumInvestment
        });

        const accumulatedDividendsData = portfolio.dividends.getCumulativeDividendsForYear(
          element.toString(),
          true
        );

        const tempDividendsData = portfolio.dividends.getDividendsForYear(
          element.toString(),
          true
        );
        dividendsData.push({ x: element.toString(), y: tempDividendsData });

        portfolioValueWithDividends.push({
          x: element.toString(),
          y: tempPortfolioValue + accumulatedDividendsData
        });
      });

      const newData = [
        {
          id: "portfolio value",
          // color: "hsl(160, 70%, 50%)",
          data: portfolioValueData
        },
        {
          id: "portfolio value + dividends",
          // color: "hsl(160, 70%, 50%)",
          data: portfolioValueWithDividends
        },
        {
          id: "accum investment",
          // color: "hsl(160, 70%, 50%)",
          data: accumInvestmentData
        },
        {
          id: "dividends",
          // color: "hsl(160, 70%, 50%)",
          data: dividendsData
        }
      ];

      setChartData(newData);
    }
  }, [years, portfolio, data]);

  if (portfolio === null) {
    return <Spin />;
  }

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        {showTitle && <Typography.Title level={3}>Portfolio valuation</Typography.Title>}
        <div style={{ height: 400, width: width - sidebarWidth - 50 }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 50, bottom: 150, left: 60 }}
            colors={{ scheme: 'category10' }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto"
              // stacked: true,
              // reverse: false
            }}
            yFormat={(data) =>
              `${StringUtils.getAmountWithSymbol(
                parseFloat(data.toString()),
                2,
                portfolio.currencySymbol
              )}`
            }
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "amount",
              legendOffset: -40,
              legendPosition: "middle"
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: false,
                translateX: 0,
                translateY: 120,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      </>
    );
  }
  return (
    <div className="example">
      <Spin />
    </div>
  );
}
