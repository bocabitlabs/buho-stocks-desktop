import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IPortfolio } from "types/portfolio";

interface Props {
  data: any;
  portfolio: IPortfolio;
  width: number;
}

export default function SuperSectorsChartNivo({
  data,
  portfolio,
  width
}: Props): ReactElement {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const tempData = [...data];
    console.debug("DATA:")
    console.debug(data)

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

    const grouped = groupBy(tempData, "superSectorName");
    console.log(grouped);

    const newGroups = Object.entries(grouped).map(([k, v]) => {
      return { id: k, label: k, value: v };
    });

    setChartData(newGroups);
  }, [data]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>Super Sectors</Typography.Title>
        <div style={{ height: 600, width: width-300 }}>
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
