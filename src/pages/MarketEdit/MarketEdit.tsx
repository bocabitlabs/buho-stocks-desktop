import React from "react";

import { Layout } from "antd";

import MarketAddEditForm from "components/MarketAddEditForm/MarketAddEditForm";
import MarketEditHeader from "./components/MarketEditHeader/MarketEditHeader";
import { useMarketsContext } from "hooks/markets/use-markets-context";
import { useParams } from "react-router-dom";
import { MarketsContext } from "contexts/markets";

export interface IRouteParams {
  marketId: string;
}

const MarketEdit = () => {

  const marketsContext = useMarketsContext();
  const { marketId } = useParams<IRouteParams>();

  return (
    <MarketsContext.Provider value={marketsContext}>
      <MarketEditHeader marketId={marketId}/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <MarketAddEditForm marketId={marketId} />
      </Layout>
    </MarketsContext.Provider>
  );
};

export default MarketEdit;