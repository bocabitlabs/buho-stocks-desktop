import { Card, Statistic, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import { PortfoliosContext } from "contexts/portfolios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { IPortfolio } from "types/portfolio";
import { StringUtils } from "utils/string-utils";

interface Props {
  portfolioId: string;
}

export default function PortfolioCardContent({
  portfolioId
}: Props): ReactElement | null {
  const { getById } = useContext(PortfoliosContext);
  const [currentPortfolio, setCurrentPortfolio] = useState<IPortfolio | null>(
    null
  );

  useEffect(() => {
    const result = getById(portfolioId);
    setCurrentPortfolio(result);
  }, [portfolioId, getById]);

  if (currentPortfolio === null) {
    return null;
  }

  const portfolioValue = currentPortfolio.getPortfolioValue(true);
  const portfolioReturn = currentPortfolio.getReturnWithDividends(true);
  const portfolioReturnPercentage = currentPortfolio.getReturnWithDividendsPercentage(
    true
  );

  let positive: BaseType = "success";
  if (portfolioReturn < 0) {
    positive = "danger";
  }
  if (portfolioReturn === 0) {
    positive = "secondary";
  }
  const formattedReturn = StringUtils.getAmountWithSymbol(
    portfolioReturn,
    2,
    currentPortfolio.currencySymbol
  );
  const formattedReturnPercentage = StringUtils.getAmountWithSymbol(
    portfolioReturnPercentage,
    2,
    "%"
  );

  return (
    <Card
      title={currentPortfolio.name}
      hoverable
      extra={
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="10" fill={currentPortfolio.color} />
        </svg>
      }
    >
      {currentPortfolio.description}
      <Statistic
        value={portfolioValue}
        suffix={currentPortfolio.currencySymbol}
        precision={2}
      />
      <Typography.Text type={positive}>{formattedReturn}</Typography.Text> -
      <Typography.Text type={positive}>{formattedReturnPercentage}</Typography.Text>
    </Card>
  );
}
