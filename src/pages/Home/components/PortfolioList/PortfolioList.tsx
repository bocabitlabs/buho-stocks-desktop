import { List } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfoliosContext } from "contexts/portfolios";
import PortfolioCard from "../PortfolioCard/PortfolioCard";

export default function PortfolioList(): ReactElement {
  const { portfolios, getAll: getAllPortfolios } = useContext(
    PortfoliosContext
  );

  useEffect(() => {
    getAllPortfolios();
  }, [getAllPortfolios]);

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={portfolios}
      renderItem={(item) => (
        <Link to={`/portfolios/${item.id}`}>
          <List.Item>
            <PortfolioCard portfolio={item} />
          </List.Item>
        </Link>
      )}
    />
  );
}
