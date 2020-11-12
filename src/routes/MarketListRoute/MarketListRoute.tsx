import React from "react";

import { Layout } from "antd";

import MarketListTable from "../../components/MarketListTable/MarketListTable";
import { MarketsContext } from "../../contexts/markets";
import { useMarketsContext } from "../../hooks/markets";
import MarketListRouteHeader from "./MarketListRouteHeader";

const MarketListRoute = () => {
  const marketsContext = useMarketsContext();

  return (
    <MarketsContext.Provider value={marketsContext}>
      <MarketListRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <MarketListTable />
      </Layout>
    </MarketsContext.Provider>
  );
};

export default MarketListRoute;
