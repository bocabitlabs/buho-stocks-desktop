import React from "react";

import { PageHeader } from "antd";

import AddCompanyForm from "../components/AddCompanyForm/AddCompanyForm";

const PortfolioDetailsRoute = () => {
  return (
    <>
      <PageHeader className="site-page-header" title="Companies" />
      <AddCompanyForm />
      {/*   <CompanyList uid={uid} /> */}
    </>
  );
};

export default PortfolioDetailsRoute;
