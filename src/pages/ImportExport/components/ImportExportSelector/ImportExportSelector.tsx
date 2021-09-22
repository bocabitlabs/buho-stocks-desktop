import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function ImportExportSelector(): ReactElement {
  const history = useHistory();
  const { t } = useTranslation();

  const goToImportPage = () => {
    history.push("/import");
  };

  const goToExportPage = () => {
    history.push("/export");
  };

  return (
    <div>
      <Button
        onClick={goToImportPage}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
      >
        {t("Import")}
      </Button>
      <Divider type="vertical">{t("OR")}</Divider>
      <Button
        onClick={goToExportPage}
        type="primary"
        icon={<UploadOutlined />}
        size="large"
      >
        {t("Export")}
      </Button>
    </div>
  );
}
