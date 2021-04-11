import { Card, List, Statistic, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import CountryFlag from "components/CountryFlag/CountryFlag";
import { PortfoliosContext } from "contexts/portfolios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import CompanyService from "services/company-service/company-service";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

interface Props {
  companyId: string;
}

export default function CompanyCard({ companyId }: Props): ReactElement | null {
  const [company, setCompany] = useState<ICompany | null>(null);
  const { portfolio } = useContext(PortfoliosContext);

  useEffect(() => {
    const comp = CompanyService.getById(companyId);
    setCompany(comp);
  }, [companyId]);

  if (company === null || portfolio === null) {
    return null;
  }

  let returnPercentage = company.returns.getReturnWithDividendsPercentage(true);
  const portfolioValue = company.portfolioValue.getPortfolioValue(true);

  let positive: BaseType = "success";
  if (returnPercentage < 0) {
    positive = "danger";
  }
  if (returnPercentage === 0) {
    positive = "secondary";
  }

  const formattedReturnPercentage = StringUtils.getAmountWithSymbol(
    returnPercentage,
    2,
    "%"
  );
  return (
    <List.Item>
      <Card
        hoverable
        extra={<CountryFlag code={company.countryCode} />}
        title={company.name}
      >
        {company.shares.getSharesCount()} shares
        <Statistic
          value={portfolioValue}
          suffix={portfolio.currencySymbol}
          precision={2}
        />
        <Typography.Text type={positive}>
          {formattedReturnPercentage}
        </Typography.Text>
      </Card>
    </List.Item>
  );
}
