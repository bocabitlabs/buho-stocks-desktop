import { ResponsiveLine } from "@nivo/line";
import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

interface Props {
  company: ICompany;
  years: number[];
}

export default function PortfolioReturnChartNivo({
  company,
  years
}: Props): ReactElement {
  const [chartData, setChartData] = useState<any[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const { t } = useTranslation();

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
      const dataOne: any = [];
      const dataTwo: any = [];
      const data3: any = [];

      const years1 = [...years];
      years1.reverse().forEach((element) => {
        const value1 = company.portfolioValue.getPortfolioValueForYear(element.toString(), true)
        dataOne.push({ x: element.toString(), y: value1 });
      });

      const years2 = [...years];
      years2.reverse().forEach((element) => {
        const value1 = company.portfolioValue.getPortfolioValueForYear(element.toString(), true)
        const dividends1 = company.dividends.getDividendsAmountForYear(element.toString(), true)
        dataTwo.push({ x: element.toString(), y: value1 + dividends1 });
      });

      const years3 = [...years];
      years3.reverse().forEach((element) => {
        const value1 = company.portfolioValue.getPortfolioValueForYear(element.toString(), true)
        const dividends1 = company.dividends.getCumulativeDividendsAmountForYear(element.toString(), true)
        data3.push({ x: element.toString(), y: value1 + dividends1 });
      });

      const newData = [
        {
          id: t("portfolio value"),
          data: dataOne
        },
        {
          id: t("+ dividends"),
          data: dataTwo
        },
        {
          id: t("+ dividends cumulative"),
          data: data3
        }
      ];

      console.debug(newData);

      setChartData(newData);
    }
  }, [years, company, t]);

  if(company === null){
    return <Spin/>
  }

  if (chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>Net Returns</Typography.Title>
        <div style={{ height: 400, width: width - sidebarWidth - 50 }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 150, left: 60 }}
            // xScale={{ type: "point" }}
            colors={{ scheme: 'category10' }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              // stacked: true,
              // reverse: false
            }}
            yFormat={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.toString()), 2, company.portfolioCurrencySymbol)}`)}
            // yFormat={`>-$.2f`}
            // axisTop={null}
            // axisRight={null}
            // axisBottom={{
            //   orient: "bottom",
            //   tickSize: 5,
            //   tickPadding: 5,
            //   tickRotation: 0,
            //   legend: "transportation",
            //   legendOffset: 36,
            //   legendPosition: "middle"
            // }}
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
                // translateX: 100,
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
