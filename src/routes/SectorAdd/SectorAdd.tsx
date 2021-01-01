import React from "react";

import { Layout } from "antd";

import SectorAddForm from "../../components/SectorAddForm/SectorAddForm";
import SectorAddHeader from "./components/SectorAddHeader/SectorAddHeader";

const AddSector = () => {
  return (
    <>
      <SectorAddHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorAddForm />
      </Layout>
    </>
  );
};

export default AddSector;
