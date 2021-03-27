import { ResponsiveLine } from "@nivo/line";
import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

interface Props {
  company: ICompany;
  years: number[];
}

export default function CompanyReturnChartPercentageNivo({
  company,
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

    if (company) {
      const cumulativeWithDividends: any = [];
      const yearReturn: any = [];
      const cumulativeReturn: any = [];
      const yearWithDividends: any = [];


      const years1 = [...years];
      years1.reverse().forEach((element) => {
        const value = company.getReturnPercentageCumulativeWithDividendsForYear(
          element.toString(),
          true
        );
        cumulativeWithDividends.push({ x: element.toString(), y: value });
      });

      const years4 = [...years];
      years4.reverse().forEach((element) => {
        const value = company.getReturnPercentageForYearWithDiviends(
          element.toString(),
          true
        );
        yearWithDividends.push({ x: element.toString(), y: value });
      });

      const years2 = [...years];
      years2.reverse().forEach((element) => {
        const value = company.getReturnPercentageForYear(element.toString(), true);
        yearReturn.push({ x: element.toString(), y: value });
      });

      // console.log("DATA2")
      // console.log(data2)

      const years3 = [...years];
      years3.reverse().forEach((element) => {
        const value = company.getReturnPercentageCumulativeForYear(
          element.toString(),
          true
        );
        cumulativeReturn.push({ x: element.toString(), y: value });
      });

      const newData = [
        {
          id: "year return + dividends",
          data: yearWithDividends
        },
        {
          id: "year return",
          data: yearReturn
        },
        {
          id: "cumulative return + dividends",
          data: cumulativeWithDividends
        },
      ];

      console.debug("Return for all year in percent", newData);

      setChartData(newData);
    }
  }, [years, company]);

  if(company === null){
    return <Spin/>
  }

  if (chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>Returns %</Typography.Title>
        <div style={{ height: 400, width: width - sidebarWidth - 50 }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 150, left: 60 }}
            // xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto"
            }}
            colors={{ scheme: 'category10' }}
            yFormat={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.toString()), 2, "%")}`)}
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
