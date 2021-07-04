import React from "react";

import { Layout } from "antd";

import { useSectorsContext } from "hooks/sectors/use-sectors-context";
import { SectorsContext } from "contexts/sectors";
import SectorListHeader from "./components/SectorListHeader/SectorListHeader";
import SectorListTable from "./components/SectorListTable/SectorListTable";

const SectorList = () => {
  const sectorsContext = useSectorsContext();

  return (
    <>
      <SectorListHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorsContext.Provider value={sectorsContext}>
          <SectorListTable />
        </SectorsContext.Provider>
      </Layout>
    </>
  );
};

export default SectorList;
