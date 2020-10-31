import React, { ReactElement, useCallback, useContext, useEffect } from "react";
import { Button, Form } from "antd";
import { SettingsItemProps } from "../../types/settings";
import AddSampleCurrenciesForm from "../AddSampleCurrenciesForm/AddSampleCurrenciesForm";
import AddSampleMarketsForm from "../AddSampleMarketsForm/AddSampleMarketsForm";
import { SettingsContext } from "../../contexts/settings";

/**
 * Add a new Currency
 */
function SettingsForm(): ReactElement {
  const [form] = Form.useForm();

  const { settings, fetchSettings, updateSettings } = useContext(SettingsContext);

  const handleUpdate = useCallback(async (values) => {
    const { selectedPortfolio } = values;
    const settings: SettingsItemProps = {
      selectedPortfolio
    };
    console.log(settings);
    updateSettings(settings);
  }, [updateSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <>
      <AddSampleCurrenciesForm /> <AddSampleMarketsForm />
      <Form form={form} name="basic" onFinish={handleUpdate}>
        {JSON.stringify(settings)}
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
