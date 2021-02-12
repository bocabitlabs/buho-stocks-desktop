import { Layout } from "antd";
import React, { ReactElement } from "react";
import CsvImportContent from "./components/CsvImportContent/CsvImportContent";
import CsvImportHeader from "./components/CsvImportHeader/CsvImportHeader";


export default function CsvImport(): ReactElement {
  return (
    <>
      <CsvImportHeader />
      <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
        <CsvImportContent />
      </Layout>
    </>
  );
}
