import React, { ReactElement, useContext } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography
} from "antd";

import { SettingsContext } from "contexts/settings";
import { ISettingsForm } from "types/settings";
import { backupDatabase } from "message-control/renderer";
import { useTranslation } from "react-i18next";

function SettingsForm(): ReactElement | null {
  const [form] = Form.useForm();
  const { settings, updateDatabasePath, updateLanguage } = useContext(
    SettingsContext
  );
  const { t, i18n } = useTranslation();
  const key = "updatable";

  const handleUpdate = (values: any) => {
    const { databasePath, language } = values;
    const newSettings: ISettingsForm = {
      databasePath,
      language
    };
    let result = undefined;

    if (settings && settings.databasePath !== newSettings.databasePath) {
      result = updateDatabasePath(newSettings.databasePath);
    }

    if (settings && settings.language !== newSettings.language) {
      console.log("Updating to " + newSettings.language);
      i18n.changeLanguage(newSettings.language);
      updateLanguage(newSettings.language);
    }

    if (result && result.changes) {
      message.success({ content: "Settings updated", key });
    }
    if (result && !result.changes) {
      message.error({
        content: `Settings not updated: ${JSON.stringify(result)}`,
        key
      });
    }
  };

  const initBackup = () => {
    const result = backupDatabase(settings?.databasePath);
    if (result && result.result === "OK") {
      message.success({
        content: `Database backed up successfully: ${result.path}`,
        key
      });
    } else {
      message.error({
        content: `Unable to back up the database: ${result.path}`,
        key
      });
    }
  };

  if (settings === null) {
    return null;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleUpdate}
      initialValues={{
        databasePath: settings.databasePath,
        language: settings.language
      }}
    >
      <Typography.Title level={3}>{t("Advanced")}</Typography.Title>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="databasePath"
            label={t("Database backup path")}
            rules={[
              { required: false, message: t("Please input the database backup") }
            ]}
            help={t(
              "Path of the database backup folder."
            )}
          >
            <Input type="text" placeholder="/Users/holden/Secure" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="&nbsp;">
            <Button type="default" onClick={initBackup}>
              {t("Backup database now")}
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="language" label={t("Language")}>
        <Select placeholder={t("Select a language")}>
          <Select.Option value={"en"} key={"en"}>
            English
          </Select.Option>
          <Select.Option value={"es"} key={"es"}>
            Español
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Update settings")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SettingsForm;
