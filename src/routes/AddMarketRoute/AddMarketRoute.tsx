import React from "react";

import { Layout } from "antd";

import AddMarketForm from "../../components/AddMarketForm/AddMarketForm";
import AddMarketRouteHeader from "./AddMarketRouteHeader";

const AddMarketRoute = () => {

  return (
    <>
      <AddMarketRouteHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <AddMarketForm />
      </Layout>
    </>
  );
};

export default AddMarketRoute;