import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { getFirebaseAuth } from "../../selectors/profile";
import { PageHeader } from "antd";
import { useParams } from "react-router";
import CompanyDetails from "../../components/CompanyDetails/CompanyDetails";

export default function CompanyDetailsRoute(): ReactElement | null {
  const { companyId } = useParams();
  const { uid }: any = useSelector(getFirebaseAuth);

  return (
    <div>
      <PageHeader title={"Company Details"} />
      <CompanyDetails id={companyId} uid={uid} />
    </div>
  );
}
