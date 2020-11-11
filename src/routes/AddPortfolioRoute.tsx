import React from "react";

import { Layout, PageHeader } from "antd";

import AddPortfolioForm from "../components/AddPortfolioForm/AddPortfolioForm";
import { Link } from "react-router-dom";
import { PortfoliosContext } from "../contexts/portfolios";
import { CurrenciesContext } from "../contexts/currencies";
import { usePortfoliosContext } from "../hooks/portfolios";
import { useCurrenciesContext } from "../hooks/currencies";

const AddPortfolioRoute = () => {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-portfolio",
      name: "add-portfolio",
      breadcrumbName: "Add portfolio"
    }
  ];
  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  console.log("AddPortfoliosRoute rendered");
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add a portfolio"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfoliosContext.Provider value={portfoliosContext}>
          <CurrenciesContext.Provider value={currenciesContext}>
            <AddPortfolioForm />
          </CurrenciesContext.Provider>
        </PortfoliosContext.Provider>
      </Layout>
    </>
  );
};

export default AddPortfolioRoute;
