import { Row, Space, Spin, Tabs } from "antd";
import React, {
  ReactElement,
  useLayoutEffect,
  useState
} from "react";
import { ICompany } from "types/company";
import CompanyReturnChartNivo from "./components/CompanyReturnChartNivo/CompanyReturnChartNivo";
import CompanyReturnChartPercentageNivo from "./components/CompanyReturnChartPercentage/CompanyReturnChartPercentageNivo";

interface Props {
  company: ICompany;
  year: string;
  years?: number[];
}

export default function Charts({ company, year, years }: Props): ReactElement {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (company) {
    return (
      <Space direction="vertical">
        <Row>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Return %" key="1">
              {years && years.length > 0 && (
                <CompanyReturnChartPercentageNivo
                  company={company}
                  years={years}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Net Return" key="2">
              {years && years.length > 0 && (
                <CompanyReturnChartNivo
                  company={company}
                  years={years}
                />
              )}
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </Space>
    );
  }

  return <Spin />;
}
