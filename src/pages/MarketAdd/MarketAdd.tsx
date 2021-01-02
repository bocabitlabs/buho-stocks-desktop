import React from "react";

import { Layout } from "antd";

import MarketAddHeader from "./components/MarketAddHeader/MarketAddHeader";
import MarketAddForm from "./components/MarketAddForm/MarketAddForm";

const AddMarketRoute = () => {

  return (
    <>
      <MarketAddHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <MarketAddForm />
      </Layout>
    </>
  );
};

export default AddMarketRoute;