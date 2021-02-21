import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { ReactElement } from "react";


export default function ImportDataForm(): ReactElement {
  return (
    <div>
      <Button
        onClick={() => null}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        Import App Data
      </Button>
      <Divider type="vertical">OR</Divider>
      <Button
        onClick={() => null}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        Import from Broker
      </Button>
    </div>
  );
}
