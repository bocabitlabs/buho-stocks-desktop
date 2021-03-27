import { Form, Select } from "antd";
import { PortfoliosContext } from "contexts/portfolios";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import PortfolioService from "services/portfolio-service";
import Charts from "./Charts/Charts";

export default function ChartsList(): ReactElement | null {
  const { portfolio } = useContext(PortfoliosContext);
  const [year, setYear] = useState("all");
  const [years, setYears] = useState<number[]>([]);

  const { Option } = Select;

  function onChange(value: any) {
    setYear(value);
  }

  useEffect(() => {
    if (portfolio !== null) {
      const currentDate = moment().format("YYYY");
      const firstTransaction = PortfolioService.getFirstTransaction(
        portfolio.id
      );
      const firstDate = moment(firstTransaction.transactionDate).format("YYYY");
      let newYears = [];
      for (let index = +currentDate; index >= +firstDate; index--) {
        newYears.push(index);
      }
      setYears(newYears);
    }
  }, [portfolio]);

  if (portfolio === null) {
    return null;
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Form name="customized_form_controls" layout="inline">
          <Form.Item>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a year"
              onChange={onChange}
              defaultValue="all"
            >
              <Option value="all">All</Option>
              {years.map((element) => (
                <Option value={element} key={element}>
                  {element}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <Charts portfolio={portfolio} year={year} years={years} />
    </div>
  );
}