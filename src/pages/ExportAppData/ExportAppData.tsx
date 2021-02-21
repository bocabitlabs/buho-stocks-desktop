import { Layout } from "antd";
import React, { ReactElement } from "react";
import ExportAppDataForm from "./components/ExportAppDataForm/ExportAppDataForm";
import ExportAppDataHeader from "./components/ExportAppDataHeader/ExportAppDataHeader";

export default function ExportData(): ReactElement {
  return (
    <>
      <ExportAppDataHeader />
      <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
        <ExportAppDataForm />
      </Layout>
    </>
  );
}
