import { Card, List } from "antd";
import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { PortfoliosContext } from "contexts/portfolios";

export default function PortfolioList(): ReactElement {
  const { portfolios } = useContext(PortfoliosContext);

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={portfolios}
      renderItem={(item) => (
        <Link to={`/portfolios/${item.id}`}>
          <List.Item>
            <Card
              title={item.name}
              hoverable
              extra={
                <svg height="20" width="20">
                  <circle cx="10" cy="10" r="10" fill={item.color} />
                </svg>
              }
            >
              {item.description}
            </Card>
          </List.Item>
        </Link>
      )}
    />
  );
}
