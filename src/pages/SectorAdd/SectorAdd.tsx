import React from "react";

import { Layout } from "antd";

import SectorAddHeader from "./components/SectorAddHeader/SectorAddHeader";
import SectorAddEditForm from "components/SectorAddEditForm/SectorAddEditForm";
import { useSectorsContext } from "hooks/sectors";
import { SectorsContext } from "contexts/sectors";

const AddSector = () => {
  const sectorsContext = useSectorsContext();

  return (
    <SectorsContext.Provider value={sectorsContext}>
      <SectorAddHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorAddEditForm />
      </Layout>
    </SectorsContext.Provider>
  );
};

export default AddSector;
