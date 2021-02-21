import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { ReactElement } from "react";
import { useHistory } from "react-router";


export default function ImportDataSelector(): ReactElement {
  const history = useHistory();
  return (
    <div>
      <Button
        onClick={() => history.push('/import/app-data')}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        Import App Data
      </Button>
      <Divider type="vertical">OR</Divider>
      <Button
        onClick={() => history.push('/import/broker')}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        Import from Broker
      </Button>
    </div>
  );
}
