import React from "react";

import { Layout } from "antd";

import InflationListTable from "../../components/InflationListTable/InflationListTable";
import InflationListRouteHeader from "./InflationListRouteHeader";
import { InflationsContext } from "../../contexts/inflations";
import { useInflationsContext } from "../../hooks/inflations";

const InflationListRoute = () => {
  const inflationsContext = useInflationsContext();

  return (
    <InflationsContext.Provider value={inflationsContext}>
      <InflationListRouteHeader />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <InflationListTable />
      </Layout>
    </InflationsContext.Provider>
  );
};

export default InflationListRoute;
