import React, { ReactElement, useContext } from "react";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";

import { SettingsContext } from "contexts/settings";
import { ISettingsForm } from "types/settings";
import { backupDatabase } from "message-control/renderer";

function SettingsForm(): ReactElement | null {
  const [form] = Form.useForm();
  const { settings, updateDatabasePath } = useContext(SettingsContext);
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
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={{ databasePath: settings.databasePath }}
      >
        <Typography.Title level={3}>Advanced</Typography.Title>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="databasePath"
              label="Database backup path"
              rules={[
                { required: false, message: "Please input the database path" }
              ]}
              help="Path of the database backup folder. If it's not set, the default location will be used."
            >
              <Input type="text" placeholder="/Users/holden/Secure" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='&nbsp;'>
              <Button type="default" onClick={initBackup}>
                Backup database now
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="language"
          label="Language"
          rules={[
            { required: false, message: "Please input the database path" }
          ]}
        >
          <Input type="text" placeholder="en, es" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update settings
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SettingsForm;
