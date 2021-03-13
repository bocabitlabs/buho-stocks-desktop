import React from "react";

import { Layout } from "antd";

import MarketAddHeader from "./components/MarketAddHeader/MarketAddHeader";
import MarketAddEditForm from "components/MarketAddEditForm/MarketAddEditForm";

const AddMarketRoute = () => {

  return (
    <>
      <MarketAddHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <MarketAddEditForm />
      </Layout>
    </>
  );
};

export default AddMarketRoute;