import { Spin, Typography } from "antd";
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { IPortfolio } from "types/portfolio";
import { StringUtils } from "utils/string-utils";
import { ResponsiveBar } from "@nivo/bar";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  portfolio: IPortfolio;
}

export default function CurrenciesChart({
  data,
  portfolio
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
    const totalInvested = portfolio.investments.getTotalInvested(true);
    const newGroups = tempData
      .sort((a: any, b: any) => b.invested - a.invested)
      .map((element, key) => {
        return {
          id: element.name,
          company: element.name,
          label: element.name,
          invested: element.invested,
          amount: (element.invested / totalInvested) * 100
        };
      });
    setChartData(newGroups);
  }, [data, portfolio.investments]);

  if (data.length > 0 && chartData.length > 0) {
    return (
      <>
        <Typography.Title level={3}>{t("% Invested by company")}</Typography.Title>
        <div style={{ height: 450, width: width - sidebarWidth - 50 }}>
          <ResponsiveBar
            data={chartData}
            keys={["amount"]}
            indexBy="company"
            margin={{ top: 50, right: 50, bottom: 150, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "category10" }}
            tooltipFormat={(data) =>
              `${StringUtils.getAmountWithSymbol(
                parseFloat(data.toString()),
                2,
                "%"
              )}`
            }
            labelFormat={(data) =>
              `${StringUtils.getAmountWithSymbol(
                parseFloat(data.toString()),
                2,
                "%"
              )}`
            }
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
              legend: `% ${t("invested")}`,
              legendPosition: "middle",
              legendOffset: -40
            }}
            labelSkipWidth={100}
            labelSkipHeight={20}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            tooltip={(input: any) => {
              return (
                <div>
                  Invested on {input.data.company}:{" "}
                  <strong>
                    {StringUtils.getAmountWithSymbol(
                      parseFloat(input.data.invested.toString()),
                      2,
                      portfolio.currencySymbol
                    )}
                  </strong>{" "}
                  ({StringUtils.getAmountWithSymbol(
                    parseFloat(input.data.amount.toString()),
                    2,
                    '%'
                  )})
                </div>
              );
            }}
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
