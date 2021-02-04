import { Card, List, Statistic, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import { PortfoliosContext } from "contexts/portfolios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import CompanyService from "services/company-service";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

interface Props {
  companyId: string;
}

export default function CompanyCard({ companyId }: Props): ReactElement | null {
  const [company, setCompany] = useState<ICompany | null>(null);
  const { portfolio } = useContext(PortfoliosContext);

  useEffect(() => {
    const comp = new CompanyService().getCompanyDetails(companyId);
    setCompany(comp);
  }, [companyId]);

  if (company === null || portfolio === null) {
    return null;
  }

  let returnPercentage = company.getReturnWithDividendsPercentage(true)
  const portfolioValue = company.getPortfolioValueWithInflation(true);

  let positive: BaseType = "success";
  if (returnPercentage < 0) {
    positive = "danger";
  }
  if (returnPercentage === 0) {
    positive = "secondary";
  }

  const formattedReturnPercentage = StringUtils.getAmountWithSymbol(returnPercentage, 2, "%");
  return (
    <List.Item>
      <Card
        hoverable
        extra={
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill={company.color} />
          </svg>
        }
        title={company.name}
      >
        {company.getSharesCount()} shares
        <Statistic
          value={portfolioValue}
          suffix={portfolio.currencySymbol}
          precision={2}
        />
        <Typography.Text type={positive}>{formattedReturnPercentage}</Typography.Text>
      </Card>
    </List.Item>
  );
}
