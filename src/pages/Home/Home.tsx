import React from "react";

import { Layout } from "antd";

import HomeRouteHeader from "./components/HomeHeader/HomeHeader";
import PortfolioList from "./components/PortfolioList/PortfolioList";

const Home = () => {

  return (
    <div>
      <HomeRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfolioList />
      </Layout>
    </div>
  );
};

export default Home;
