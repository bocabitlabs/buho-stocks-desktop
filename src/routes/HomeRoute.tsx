import React, { useEffect, useState } from "react";

import { Button, Card, Layout, PageHeader } from "antd";

import {
  ExampleComponent,
  ExampleComponentWithType
} from "../components/ExampleComponent";
import { Link, useHistory } from "react-router-dom";
import { getPortfolios } from "../daos/portfolio-dao";
import { PortfolioFields } from "../types/portfolio";

const Home = () => {
  const history = useHistory();
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    getPortfolios(setPortfolios);
  }, []);
  return (
    <>
      <PageHeader
        title="HOME"
        extra={[
          <Button
            onClick={() => {
              history.push("/add/portfolio");
            }}
          >
            Add Portfolio
          </Button>,
          <Button
            onClick={() => {
              history.push("/add/currency");
            }}
          >
            Add Currency
          </Button>,
          <Button
            onClick={() => {
              history.push("/add/market");
            }}
          >
            Add market
          </Button>
        ]}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <ExampleComponent who={"me"} />
        <ExampleComponentWithType who={"me2"} />
        {portfolios &&
          portfolios.map((portfolio: PortfolioFields, index) => (
            <Link
              to={`/portfolios/${portfolio.id}`}
              key={`portfolio-card-${index}`}
            >
              <Card
                title={portfolio.name}
                style={{ width: 300 }}
                hoverable
                key={`portfolio-card-${index}`}
              >
                {portfolio.description}
              </Card>
            </Link>
          ))}
      </Layout>

      {/* <CurrencyList uid={uid} /> */}
    </>
  );
};

export default Home;
