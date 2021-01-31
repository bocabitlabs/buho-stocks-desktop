import { Card, List } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import CompanyService from "services/company-service";
import { ICompany } from "types/company";

interface Props {
  companyId: string;
}

export default function CompanyCard({ companyId }: Props): ReactElement | null {
  const [company, setCompany] = useState<ICompany | null>(null);

  useEffect(() => {
    const comp = new CompanyService().getCompanyDetails(companyId);
    setCompany(comp);
  }, [companyId]);

  if (company === null) {
    return null;
  }

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
      </Card>
    </List.Item>
  );
}
