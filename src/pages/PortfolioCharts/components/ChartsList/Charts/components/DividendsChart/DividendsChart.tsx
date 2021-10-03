import { Spin, Typography } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IPortfolio } from "types/portfolio";
import fewColors from "utils/colors";
import { StringUtils } from "utils/string-utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    const tempData = [...data];
    const totalDividends = portfolio.dividends.getDividends()
    const newGroups = tempData.map((element, key) => {
      return {
        id: element.name,
        label: element.name,
        value: element.dividends/totalDividends * 100,
        color: fewColors[key % fewColors.length]
      };
    });
    setChartData(newGroups);
  }, [data, portfolio.dividends]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>{t("Dividends by company")}</Typography.Title>
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
            valueFormat={(data)=> (`${StringUtils.getAmountWithSymbol(parseFloat(data.toString()), 2, '%')}`)}
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
