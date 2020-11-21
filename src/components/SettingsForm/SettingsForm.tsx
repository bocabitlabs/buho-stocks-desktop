import React, { ReactElement, useCallback, useContext } from "react";
import { Button, Form } from "antd";
import AddSampleCurrenciesForm from "../AddSampleCurrenciesForm/AddSampleCurrenciesForm";
import AddSampleMarketsForm from "../AddSampleMarketsForm/AddSampleMarketsForm";
import { SettingsContext } from "../../contexts/settings";

/**
 * Add a new Currency
 */
function SettingsForm(): ReactElement {
  const [form] = Form.useForm();

  const { settings } = useContext(SettingsContext);

  const handleUpdate = useCallback(async (values) => {

  }, []);

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
