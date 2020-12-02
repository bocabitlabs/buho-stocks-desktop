import React from "react";

import { Layout } from "antd";

import MarketAddForm from "../../components/MarketAddForm/MarketAddForm";
import MarketAddRouteHeader from "./MarketAddRouteHeader";

const AddMarketRoute = () => {

  return (
    <>
      <MarketAddRouteHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <MarketAddForm />
      </Layout>
    </>
  );
};

export default AddMarketRoute;