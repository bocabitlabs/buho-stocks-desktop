import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IPortfolio } from "types/portfolio";
import fewColors from "utils/colors";
import { StringUtils } from "utils/string-utils";
import { ResponsiveBar } from "@nivo/bar";

interface Props {
  data: any;
  portfolio: IPortfolio;
}

export default function CurrenciesChart({
  data,
  portfolio,
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
    const newGroups = tempData.sort((a: any, b: any) => b.invested - a.invested).map((element, key) => {
      return {
        id: element.name,
        company: element.name,
        label: element.name,
        amount: element.invested,
        color: fewColors[key % fewColors.length]
      };
    });
    setChartData(newGroups);
  }, [data]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>Invested</Typography.Title>
        <div style={{ height: 450, width: width - sidebarWidth - 100 }}>
          <ResponsiveBar
            data={chartData}
            keys={[ 'amount' ]}
            indexBy="company"
            margin={{ top: 50, right: 130, bottom: 150, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: 'category10' }}
            tooltipFormat={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.toString()), 2, portfolio.currencySymbol)}`)}
            labelFormat={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.toString()), 2, portfolio.currencySymbol)}`)}
            // defs={[
            //   {
            //     id: "dots",
            //     type: "patternDots",
            //     background: "inherit",
            //     color: "#38bcb2",
            //     size: 4,
            //     padding: 1,
            //     stagger: true
            //   },
            //   {
            //     id: "lines",
            //     type: "patternLines",
            //     background: "inherit",
            //     color: "#eed312",
            //     rotation: -45,
            //     lineWidth: 6,
            //     spacing: 10
            //   }
            // ]}
            // fill={[
            //   {
            //     match: {
            //       id: "fries"
            //     },
            //     id: "dots"
            //   },
            //   {
            //     match: {
            //       id: "sandwich"
            //     },
            //     id: "lines"
            //   }
            // ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legendPosition: "middle",
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "invested",
              legendPosition: "middle",
              legendOffset: -40
            }}
            labelSkipWidth={100}
            labelSkipHeight={20}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
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
