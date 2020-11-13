import React from "react";

import { Layout } from "antd";

import AddSectorForm from "../../components/AddSectorForm/AddSectorForm";
import AddSectorRouteHeader from "./AddSectorRouteHeader";
import AddPortfolioRouteHeader from "../AddPortfolioRoute/AddPortfolioRouteHeader";

const AddSectorRoute = () => {
  return (
    <>
      <AddPortfolioRouteHeader />
      <AddSectorRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <AddSectorForm />
      </Layout>
    </>
  );
};

export default AddSectorRoute;
