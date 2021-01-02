import React from "react";

import { Layout } from "antd";

import { InflationsContext } from "contexts/inflations";
import { useInflationsContext } from "hooks/inflations";
import InflationListTable from "./components/InflationListTable/InflationListTable";
import InflationListHeader from "./components/InflationListHeader/InflationListHeader";

const InflationList = () => {
  const inflationsContext = useInflationsContext();

  return (
    <InflationsContext.Provider value={inflationsContext}>
      <InflationListHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <InflationListTable />
      </Layout>
    </InflationsContext.Provider>
  );
};

export default InflationList;
