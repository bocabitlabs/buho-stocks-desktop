import { ResponsiveLine } from "@nivo/line";
import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { IPortfolio } from "types/portfolio";
import { StringUtils } from "utils/string-utils";

interface Props {
  data: any;
  portfolio: IPortfolio;
  years: number[];
}

export default function PortfolioReturnChartNivo({
  data,
  portfolio,
  years
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
    if (portfolio) {
      const dataOne: any = [];
      const dataTwo: any = [];

      const years1 = [...years];
      years1.reverse().forEach((element) => {
        const value = portfolio.returns.getReturnWithDividendsForYear(
          element.toString(),
          true
        );
        dataOne.push({ x: element.toString(), y: value });
      });

      const years2 = [...years];
      years2.reverse().forEach((element) => {
        const value = portfolio.returns.getReturnForYear(element.toString(), true);
        dataTwo.push({ x: element.toString(), y: value });
      });

      const newData = [
        {
          id: "with dividends",
          data: dataOne
        },
        {
          id: "no dividends",
          data: dataTwo
        }
      ];

      setChartData(newData);
    }
  }, [years, portfolio]);

  if(portfolio === null){
    return <Spin/>
  }

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>Net Returns</Typography.Title>
        <div style={{ height: 400, width: width - sidebarWidth - 50 }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 50, bottom: 150, left: 60 }}
            colors={{ scheme: 'category10' }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              // stacked: true,
              // reverse: false
            }}
            yFormat={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.toString()), 2, portfolio.currencySymbol)}`)}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: `amount ${portfolio.currencySymbol}`,
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
                translateY: 100,
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
