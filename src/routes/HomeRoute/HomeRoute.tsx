import React from "react";

import {
  ExampleComponent,
  ExampleComponentWithType
} from "../../components/ExampleComponent/ExampleComponent";
import AddCurrencyForm from "../../components/AddCurrencyForm/AddCurrencyForm";
import CurrencyList from "../../components/CurrencyList/CurrencyList";
import { useSelector } from "react-redux";
import { getFirebaseAuth } from "../../selectors/profile";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { Layout, PageHeader } from "antd";

import AddCompanyForm from "../../components/AddCompanyForm/AddCompanyForm";
import CompanyList from "../../components/CompanyList/CompanyList";
import RouteContent from "../RouteContent";
import { homeBreadcrumbs } from "../breadcrumbs";

const Home = () => {
  const { uid }: any = useSelector(getFirebaseAuth);

  return (
    <RouteContent breadcrumbs={homeBreadcrumbs}>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <h1>Home</h1>
        <div>
          <PageHeader className="site-page-header" title="Currencies" />
          <ExampleComponent who={"me"} />
          <ExampleComponentWithType who={"me2"} />
          <AddCurrencyForm />
          <CurrencyList uid={uid} />
        </div>
        <div>
          <PageHeader className="site-page-header" title="Companies" />
          <AddCompanyForm />
          <CompanyList uid={uid} />
        </div>
        <LogoutButton />
      </Layout.Content>
    </RouteContent>
  );
};

export default Home;
