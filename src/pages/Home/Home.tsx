import React from "react";

import { Layout } from "antd";

import { PortfoliosContext } from "contexts/portfolios";
import { usePortfoliosContext } from "hooks/portfolios";
import HomeRouteHeader from "./components/HomeHeader/HomeHeader";
import PortfolioList from "./components/PortfolioList/PortfolioList";

const Home = () => {
  const portfoliosContext = usePortfoliosContext();

  console.log("Home rendered");

  return (
    <PortfoliosContext.Provider value={portfoliosContext}>
      <HomeRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfolioList />
      </Layout>
    </PortfoliosContext.Provider>
  );
};

export default Home;
