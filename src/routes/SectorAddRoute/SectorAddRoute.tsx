import React from "react";

import { Layout } from "antd";

import SectorAddForm from "../../components/SectorAddForm/SectorAddForm";
import SectorAddRouteHeader from "./SectorAddRouteHeader";

const AddSectorRoute = () => {
  return (
    <>
      <SectorAddRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorAddForm />
      </Layout>
    </>
  );
};

export default AddSectorRoute;
