import { Layout } from "antd";
import React, { ReactElement } from "react";
import ImportExportHeader from "./components/ImportExportHeader/ImportExportHeader";
import ImportExportSelector from "./components/ImportExportSelector/ImportExportSelector";


export default function CsvImport(): ReactElement {
  return (
    <>
      <ImportExportHeader />
      <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
        <ImportExportSelector />
      </Layout>
    </>
  );
}