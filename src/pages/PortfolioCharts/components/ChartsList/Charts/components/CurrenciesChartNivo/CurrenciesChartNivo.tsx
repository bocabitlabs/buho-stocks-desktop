import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IPortfolio } from "types/portfolio";

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

    const grouped = groupBy(tempData, "currencyName");
    const newGroups = Object.entries(grouped).map(([k, v]) => {
      return { id: k, label: k, value: v };
    });

    setChartData(newGroups);
  }, [data]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={4}>Currencies</Typography.Title>
        <div style={{ height: 300, width: width/2-sidebarWidth }}>
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
