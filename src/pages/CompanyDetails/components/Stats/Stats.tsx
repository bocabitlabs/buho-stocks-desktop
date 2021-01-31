import { Col, Row, Statistic } from "antd";
import React, { ReactElement } from "react";
import { ICompany } from "types/company";

interface Props {
  company: ICompany;
}

export default function Stats({ company }: Props): ReactElement {
  return (
    <div style={{ marginBottom: 16 }}>
      <Row gutter={24}>
        <Col span={6}>
          <Statistic title="Shares" value={company.getSharesCount()} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Dividends"
            value={company.getDividendsAmount()}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Invested"
            value={company.getTotalInvested()}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Portfolio Value"
            value={company.getPortfolioValue()}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Portfolio Value"
            value={company.getPortfolioValueWithInflation()}
            precision={2}
          />
        </Col>
        <Col span={6}>
          <Statistic title="Return" value={112893} precision={2} />
        </Col>
      </Row>
    </div>
  );
}
