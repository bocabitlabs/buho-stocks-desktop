import { Col, Row, Statistic, Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import moment from "moment";
import React from "react";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

interface Props {
  company: ICompany;
}

export default function Stats({ company }: Props): React.ReactElement | null {
  let latestStockPrice = company.getLatestStockPrice(true);
  const sharesCount = company.getSharesCount();
  const dividendsAmount = company.getDividendsAmount(true);
  const totalInvested = company.getTotalInvested(true);
  const portfolioValue = company.getPortfolioValue(true);
  const companyReturn = company.getReturnWithDividends(true);
  const returnPercentage = company.getReturnWithDividendsPercentage(true);
  const companyRpd = company.getRpd(true);
  const companyYoc = company.getYoc(true);

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
    <div style={{ marginBottom: 16 }}>
      <Row gutter={24}>
        <Col span={6}>
          <Statistic title="Shares" value={sharesCount} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Dividends"
            value={dividendsAmount}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Invested"
            value={totalInvested}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col>
        {latestStockPrice ? (
          <Col span={6}>
            <Statistic
              title="Stock Price"
              value={latestStockPrice.price}
              suffix={company.portfolioCurrencySymbol}
              precision={2}
            />
            <Typography.Text type="secondary">
              {moment(new Date(latestStockPrice.transactionDate)).format(
                "DD/MM/YYYY"
              )}
            </Typography.Text>
          </Col>
        ) : (
          <Col span={6}>
            <Statistic title="Stock Price" value={"Not set"} />
          </Col>
        )}
        <Col span={6}>
          <Statistic
            title="Portfolio Value"
            value={portfolioValue}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Return"
            value={companyReturn}
            suffix={company.portfolioCurrencySymbol}
            precision={2}
          />
          <Typography.Text type={positive}>
            {formattedReturnPercentage}
          </Typography.Text>
        </Col>
        <Col span={6}>
          {isNaN(companyRpd) ? (
            <Statistic title="RPD" value={"Not set"} />
          ) : (
            <Statistic
              title="RPD"
              value={companyRpd}
              suffix="%"
              precision={2}
            />
          )}
        </Col>
        <Col span={6}>
          {isNaN(companyYoc) ? (
            <Statistic title="YOC" value={"Not set"} />
          ) : (
            <Statistic
              title="YOC"
              value={companyYoc}
              suffix="%"
              precision={2}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
