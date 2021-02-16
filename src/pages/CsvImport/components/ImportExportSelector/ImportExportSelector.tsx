import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

export default function ImportExportSelector(): ReactElement {
  const history = useHistory();

  const goToImportPage = () => {
    history.push("/import");
  }

  const goToExportPage = () => {
    history.push("/export");
  }

  return (
    <div>
      <p>
        <Button onClick={goToImportPage} type="primary" icon={<DownloadOutlined />} size="large">
          Import
        </Button>
        <Divider type="vertical">OR</Divider>
        <Button onClick={goToExportPage} type="primary" icon={<UploadOutlined />} size="large">
          Export
        </Button>
      </p>
    </div>
  );
}
