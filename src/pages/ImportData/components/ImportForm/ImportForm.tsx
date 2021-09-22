import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";


export default function ImportDataForm(): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        onClick={() => null}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        {t("Import App Data")}
      </Button>
      <Divider type="vertical">{t("OR")}</Divider>
      <Button
        onClick={() => null}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        {t("Import from Broker")}
      </Button>
    </div>
  );
}
