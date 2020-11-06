import React, { useContext, useEffect } from "react";

import { Button, Card, Col, Layout, PageHeader, Row } from "antd";

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
        <Row gutter={16}>
          {portfolios &&
            portfolios.map((portfolio: PortfolioFields, index) => (
              <Col span={8} key={`portfolio-card-${index}`}>
                <Link to={`/portfolios/${portfolio.id}`}>
                  <Card title={portfolio.name} hoverable>
                    {portfolio.description}
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Layout>

    </>
  );
};

export default Home;
