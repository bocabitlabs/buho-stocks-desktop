import { Layout } from "antd";
import React, { ReactElement } from "react";
import CsvAppImporter from "./components/CsvAppImporter/CsvAppImporter";
import ImportAppDataHeader from "./components/ImportAppDataHeader/ImportAppDataHeader";

export default function ExportData(): ReactElement {
  return (
    <>
      <ImportAppDataHeader />
      <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
        <CsvAppImporter/>
      </Layout>
    </>
  );
}
