import React, { useState } from "react";
import sendAsync from "../message-control/renderer";

import { Layout, PageHeader } from "antd";

import RouteContent from "./RouteContent";
import {
  ExampleComponent,
  ExampleComponentWithType
} from "../components/ExampleComponent";
import AddPortfolioForm from "../components/AddPortfolioForm/AddPortfolioForm";
import AddCurrencyForm from "../components/AddCurrencyForm/AddCurrencyForm";
// import AddCompanyForm from "../components/AddCompanyForm/AddCompanyForm";
// import CompanyList from "../components/CompanyList/CompanyList";

const Home = () => {
  const [message, setMessage] = useState("SELECT * FROM currencies");
  const [response, setResponse] = useState();

  function send(sql: string, callback: Function) {
    sendAsync(sql).then((result: React.SetStateAction<undefined>) =>
      callback(result)
    );
  }

  return (
    <>
      <PageHeader className="site-page-header" title="Currencies" />
      <AddCurrencyForm />
      <PageHeader className="site-page-header" title="Portfolios" />
      <AddPortfolioForm />
      <ExampleComponent who={"me"} />
      <ExampleComponentWithType who={"me2"} />
      {/* <CurrencyList uid={uid} /> */}
    </>
  );
};

export default Home;
