import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";


export default function ImportDataSelector(): ReactElement {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div>
      <Button
        onClick={() => history.push('/import/app-data')}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        {t("Import App Data")}
      </Button>
      <Divider type="vertical">{t("OR")}</Divider>
      <Button
        onClick={() => history.push('/import/broker')}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        {t("Import from Broker")}
      </Button>
    </div>
  );
}
