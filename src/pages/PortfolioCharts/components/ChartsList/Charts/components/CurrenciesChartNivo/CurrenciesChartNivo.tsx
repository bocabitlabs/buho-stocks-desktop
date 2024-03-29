import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IPortfolio } from "types/portfolio";
import { StringUtils } from "utils/string-utils";
import { useTranslation } from "react-i18next";

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
    const tempData = [...data];
    let companiesCount = 0;
    var groupBy = function (xs: any, key: any) {
      return xs.reduce(function (rv: any, x: any) {
        var name = x[key];
        if (!rv.hasOwnProperty(name)) {
          rv[name] = 0;
        }
        rv[name]++;
        companiesCount++;
        return rv;
      }, {});
    };
    const grouped = groupBy(tempData, "currencyName");
    const newGroups = Object.entries(grouped).map(([k, v]) => {
      const value: string = v as string;
      return { id: k, label: k, value: (parseInt(value)/companiesCount * 100) };
    });

    setChartData(newGroups);
  }, [data]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={4}>{t("Currencies")}</Typography.Title>
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
            sliceLabel={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.value.toString()), 2, '%')}`)}
            valueFormat={(value: any) => (`${StringUtils.getAmountWithSymbol(parseFloat(value.toString()), 2, '%')}`)}
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
