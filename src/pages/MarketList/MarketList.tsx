import React from "react";

import { Layout } from "antd";

import { MarketsContext } from "contexts/markets";
import { useMarketsContext } from "hooks/markets/use-markets-context";
import MarketListHeader from "./components/MarketListHeader/MarketListHeader";
import MarketListTable from "./components/MarketListTable/MarketListTable";

const MarketListRoute = () => {
  const marketsContext = useMarketsContext();

  return (
    <MarketsContext.Provider value={marketsContext}>
      <MarketListHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <MarketListTable />
      </Layout>
    </MarketsContext.Provider>
  );
};

export default MarketListRoute;
