import React from "react";

import { Layout } from "antd";

import { useSectorsContext } from "hooks/sectors/use-sectors-context";
import { useParams } from "react-router-dom";
import { SectorsContext } from "contexts/sectors";
import SectorEditHeader from "./components/SectorEditHeader/SectorEditHeader";
import SectorAddEditForm from "components/SectorAddEditForm/SectorAddEditForm";

export interface IRouteParams {
  sectorId: string;
}

const SectorEdit = () => {
  const sectorsContext = useSectorsContext();
  const { sectorId } = useParams<IRouteParams>();

  return (
    <SectorsContext.Provider value={sectorsContext}>
      <SectorEditHeader sectorId={sectorId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SectorAddEditForm sectorId={sectorId} />
      </Layout>
    </SectorsContext.Provider>
  );
};

export default SectorEdit;
