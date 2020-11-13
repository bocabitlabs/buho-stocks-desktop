import React from "react";

import { Layout } from "antd";

import SectorListTable from "../../components/SectorListTable/SectorListTable";
import SectorListRouteHeader from "./SectorListRouteHeader";
import { useSectorsContext } from "../../hooks/sectors";
import { SectorsContext } from "../../contexts/sectors";

const SectorListRoute = () => {
  const sectorsContext = useSectorsContext();

  return (
    <>
      <SectorListRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorsContext.Provider value={sectorsContext}>
          <SectorListTable />
        </SectorsContext.Provider>
      </Layout>
    </>
  );
};

export default SectorListRoute;
