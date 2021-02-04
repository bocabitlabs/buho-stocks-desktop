import { Card, Statistic } from 'antd'
import { PortfoliosContext } from 'contexts/portfolios';
import React, { ReactElement, useContext, useEffect } from 'react'

interface Props {
  portfolioId: string;
}

export default function PortfolioCardContent({portfolioId}: Props): ReactElement| null {
  const { portfolio, fetchPortfolio } = useContext(PortfoliosContext);

  useEffect(() => {
    fetchPortfolio(portfolioId)
  }, [fetchPortfolio, portfolioId])

  if(portfolio === null){
    return null;
  }

  const portfolioValue = portfolio.getPortfolioValueWithInflation(true);

  return (
    <Card
        title={portfolio.name}
        hoverable
        extra={
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill={portfolio.color} />
          </svg>
        }
      >
        {portfolio.description}
        <Statistic
          value={portfolioValue}
          suffix={portfolio.currencySymbol}
          precision={2}
        />
      </Card>
  )
}
