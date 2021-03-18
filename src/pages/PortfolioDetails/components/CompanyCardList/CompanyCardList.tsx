import { List } from "antd";
import { CompaniesContext } from "contexts/companies";
import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard/CompanyCard";

interface Props {
  portfolioId: string;
}

export default function CompanyCardList({ portfolioId }: Props): ReactElement {
  const { companies } = useContext(CompaniesContext);

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={companies}
      renderItem={(item) => (
        <Link to={`/portfolios/${portfolioId}/companies/${item.id}`}>
          <CompanyCard companyId={item.id} />
        </Link>
      )}
    />
  );
}
