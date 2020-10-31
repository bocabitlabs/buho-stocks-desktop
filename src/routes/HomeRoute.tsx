import React, { useContext, useEffect } from "react";

import { Button, Card, Col, Layout, PageHeader, Row } from "antd";

import {
  ExampleComponent,
  ExampleComponentWithType
} from "../components/ExampleComponent";
import { Link, useHistory } from "react-router-dom";
import { PortfolioFields } from "../types/portfolio";
import { PortfoliosContext } from "../contexts/portfolios";

const Home = () => {
  const history = useHistory();
  const { portfolios, fetchPortfolios } = useContext(PortfoliosContext);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

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
        <Row gutter={16}>
          {portfolios &&
            portfolios.map((portfolio: PortfolioFields, index) => (
              <Col span={8}>
                <Link
                  to={`/portfolios/${portfolio.id}`}
                  key={`portfolio-card-${index}`}
                >
                  <Card
                    title={portfolio.name}
                    hoverable
                    key={`portfolio-card-${index}`}
                  >
                    {portfolio.description}
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Layout>

      {/* <CurrencyList uid={uid} /> */}
    </>
  );
};

export default Home;
