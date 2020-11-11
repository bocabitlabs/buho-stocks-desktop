import React from "react";

import { Button, Layout, PageHeader } from "antd";

import { useHistory } from "react-router-dom";
import PortfolioList from "../components/PortfolioList/PortfolioList";

const Home = () => {
  const history = useHistory();
  console.log("Home rendered");

  return (
    <>
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
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfolioList />
      </Layout>
    </>
  );
};

export default Home;
