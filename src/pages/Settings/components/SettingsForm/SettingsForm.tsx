import React, { ReactElement, useContext } from "react";
import { Button, Form, Input, message, Typography } from "antd";

import { SettingsContext } from "contexts/settings";
import { ISettingsForm } from "types/settings";

import AddSampleCurrenciesForm from "../AddSampleCurrenciesForm/AddSampleCurrenciesForm";
import AddSampleMarketsForm from "../AddSampleMarketsForm/AddSampleMarketsForm";

/**
 * Add a new Currency
 */
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
    console.log(newSettings);
    console.log(settings);

    if (settings && settings.databasePath !== newSettings.databasePath) {
      console.log("Database path is different. Updating...");
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

  if (settings === null) {
    return null;
  }

  return (
    <>
      <AddSampleCurrenciesForm /> <AddSampleMarketsForm />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={{ databasePath: settings.databasePath }}
      >
        <Typography.Title level={3}>Advanced</Typography.Title>
        <Form.Item
          name="databasePath"
          label="Database path"
          rules={[
            { required: false, message: "Please input the database path" }
          ]}
          help="Path of the database. If it's not set, the default location will be used. E.g: /Users/holden/Secure/"
        >
          <Input type="text" placeholder="/Users/holden/Secure" />
        </Form.Item>
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
