import { Layout } from "antd";
import React, { ReactElement } from "react";
import ImportHeader from "./components/ImportHeader/ImportHeader";
import ImportSelector from "./components/ImportSelector/ImportSelector";

export default function ExportData(): ReactElement {
  return (
    <>
      <ImportHeader />
      <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
        <ImportSelector />
      </Layout>
    </>
  );
}
