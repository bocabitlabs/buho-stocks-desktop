import { Card, Col, Row } from "antd";
import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { PortfoliosContext } from "../../contexts/portfolios";
import { PortfolioFields } from "../../types/portfolio";

export default function PortfolioList(): ReactElement {
  const { portfolios } = useContext(PortfoliosContext);

  return (
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
  );
}
