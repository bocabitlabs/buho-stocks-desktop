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
    <>
      <HomeRouteHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfoliosContext.Provider value={portfoliosContext}>
          <PortfolioList />
        </PortfoliosContext.Provider>
      </Layout>
    </>
  );
};

export default Home;
