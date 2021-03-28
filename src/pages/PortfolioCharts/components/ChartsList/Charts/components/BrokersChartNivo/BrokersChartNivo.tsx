import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IPortfolio } from "types/portfolio";

interface Props {
  data: any;
  portfolio: IPortfolio;
  width: number;
}

export default function CurrenciesChart({
  data,
  portfolio,
  width
}: Props): ReactElement {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const tempData = [...data];

    var groupBy = function (xs: any, key: any) {
      return xs.reduce(function (rv: any, x: any) {
        var name = x[key];
        if (!rv.hasOwnProperty(name)) {
          rv[name] = 0;
        }
        rv[name]++;
        return rv;
      }, {});
    };

    const grouped = groupBy(tempData, "broker");
    console.log(grouped);

    const newGroups = Object.entries(grouped).map(([k, v]) => {
      return { id: k, label: k, value: v };
    });
    setChartData(newGroups);
  }, [data]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={4}>Brokers</Typography.Title>
        <div style={{ height: 300, width: width/2-300 }}>
          <ResponsivePie
            data={chartData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'category10' }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={5}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            sortByValue
            // defs={[
            //   {
            //     id: "dots",
            //     type: "patternDots",
            //     background: "inherit",
            //     color: "rgba(255, 255, 255, 0.3)",
            //     size: 4,
            //     padding: 1,
            //     stagger: true
            //   },
            //   {
            //     id: "lines",
            //     type: "patternLines",
            //     background: "inherit",
            //     color: "rgba(255, 255, 255, 0.3)",
            //     rotation: -45,
            //     lineWidth: 6,
            //     spacing: 10
            //   }
            // ]}
            // fill={[
            //   {
            //     match: {
            //       id: "ruby"
            //     },
            //     id: "dots"
            //   },
            //   {
            //     match: {
            //       id: "c"
            //     },
            //     id: "dots"
            //   },
            //   {
            //     match: {
            //       id: "go"
            //     },
            //     id: "dots"
            //   },
            //   {
            //     match: {
            //       id: "python"
            //     },
            //     id: "dots"
            //   },
            //   {
            //     match: {
            //       id: "scala"
            //     },
            //     id: "lines"
            //   },
            //   {
            //     match: {
            //       id: "lisp"
            //     },
            //     id: "lines"
            //   },
            //   {
            //     match: {
            //       id: "elixir"
            //     },
            //     id: "lines"
            //   },
            //   {
            //     match: {
            //       id: "javascript"
            //     },
            //     id: "lines"
            //   }
            // ]}
            // legends={[
            //   {
            //     anchor: "bottom",
            //     direction: "row",
            //     justify: false,
            //     translateX: 0,
            //     translateY: 56,
            //     itemsSpacing: 0,
            //     itemWidth: 100,
            //     itemHeight: 18,
            //     itemTextColor: "#999",
            //     itemDirection: "left-to-right",
            //     itemOpacity: 1,
            //     symbolSize: 18,
            //     symbolShape: "circle",
            //     effects: [
            //       {
            //         on: "hover",
            //         style: {
            //           itemTextColor: "#000"
            //         }
            //       }
            //     ]
            //   }
            // ]}
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
