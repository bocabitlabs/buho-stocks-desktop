import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { getCompany } from "../../selectors/company";
import { useFirestoreConnect } from "react-redux-firebase";
import { PageHeader, Descriptions } from "antd";
import CurrencyDetails from "../CurrencyDetails/CurrencyDetails";

interface Props {
  id: string;
  uid: string;
}

export default function CompanyDetails({
  id,
  uid
}: Props): ReactElement | null {
  useFirestoreConnect([
    {
      collection: `users/${uid}/companies`,
      doc: id,
      storeAs: id
    }
  ]);

  const company = useSelector(getCompany)(id);

  if (company) {
    return (
      <div>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={company.name}
          subTitle={company.ticker}
        >
          <Descriptions title="Company Info" layout="vertical">
            <Descriptions.Item label="Ticker">
              {company.ticker}
            </Descriptions.Item>
            <Descriptions.Item label="Currency">
              <CurrencyDetails id={company.currency} uid={uid} />
            </Descriptions.Item>
            <Descriptions.Item label="Market">
              {company.market}
            </Descriptions.Item>
            <Descriptions.Item label="Link">
              {company.link}
            </Descriptions.Item>
            <Descriptions.Item label="Notes" span={2}>
              {company.notes}
            </Descriptions.Item>
          </Descriptions>
          {JSON.stringify(company)}
        </PageHeader>
      </div>
    );
  }

  return null;
}
