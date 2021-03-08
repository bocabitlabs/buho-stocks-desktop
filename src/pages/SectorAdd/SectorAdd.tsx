import React from "react";

import { Layout } from "antd";

import SectorAddHeader from "./components/SectorAddHeader/SectorAddHeader";
import SectorAddEditForm from "components/SectorAddForm/SectorAddEditForm";

const AddSector = () => {
  return (
    <>
      <SectorAddHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorAddEditForm />
      </Layout>
    </>
  );
};

export default AddSector;
