import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

export default function HomeRouteHeader(): ReactElement {
  const history = useHistory();

  return (
    <PageHeader
      title="HOME"
      extra={[
        <Button
          key={"portfolio-add-header"}
          onClick={() => {
            history.push("/add/portfolio");
          }}
        >
          Add Portfolio
        </Button>,
        <Button
          key={"currency-add-header"}
          onClick={() => {
            history.push("/add/currency");
          }}
        >
          Add Currency
        </Button>,
        <Button
          key={"market-add-header"}
          onClick={() => {
            history.push("/add/market");
          }}
        >
          Add market
        </Button>
      ]}
    />
  );
}
