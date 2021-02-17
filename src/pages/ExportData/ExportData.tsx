import { Layout } from "antd";
import React, { ReactElement } from "react";
import ExportDataForm from "./components/ExportDataForm/ExportDataForm";


export default function ExportData(): ReactElement {


  return (
    <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
      <ExportDataForm/>
    </Layout>
  );
}
