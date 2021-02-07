import { Card, Statistic } from "antd";
import { PortfoliosContext } from "contexts/portfolios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { IPortfolio } from "types/portfolio";

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

  const portfolioValue = currentPortfolio.getPortfolioValueWithInflation(true);

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
    </Card>
  );
}
