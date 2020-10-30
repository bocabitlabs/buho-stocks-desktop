import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Button, Form, Select } from "antd";
import { getSettings, updateSettings } from "../../daos/settings-dao";
import { SettingsItemProps } from "../../types/settings";
import AddSampleCurrenciesForm from "../AddSampleCurrenciesForm/AddSampleCurrenciesForm";
import AddSampleMarketsForm from "../AddSampleMarketsForm/AddSampleMarketsForm";
import { getPortfolios } from "../../daos/portfolio-dao";
import { PortfolioFields } from "../../types/portfolio";
import { SettingsContext } from "../../contexts/settings";

/**
 * Add a new Currency
 */
function SettingsForm(): ReactElement {
  const [form] = Form.useForm();

  const [portfolios, setPortfolios] = useState<PortfolioFields[]>([]);
  const [settings, setSettings] = useState<SettingsItemProps[]>([]);

  useEffect(() => {
    getPortfolios(setPortfolios);
  }, []);

  useEffect(() => {
    getSettings(setSettings);
  }, []);

  const handleUpdate = useCallback(async (values) => {
    const { selectedPortfolio } = values;
    const settings: SettingsItemProps = {
      selectedPortfolio
    };
    console.log(settings);
    updateSettings(settings, customSetSettings);
  }, []);

  const customSetSettings = (result: SettingsItemProps[]) => {
    getSettings(setSettings);
    console.log(result);
  };

  return (
    <>
      <AddSampleCurrenciesForm /> <AddSampleMarketsForm />
      <Form form={form} name="basic" onFinish={handleUpdate}>
        {JSON.stringify(settings)}
        <Form.Item
          name="selectedPortfolio"
          label="Selected portfolio"
          // rules={[
          //   { required: true, message: "Please input the name of the sector" }
          // ]}
        >
          <SettingsContext.Provider value={{ settings, setSettings }}>
            {settings[0]?.selectedPortfolio.toString()}
            {portfolios.length > 0 && (
              <Select
                placeholder="Portfolios"
                style={{ width: 120 }}
                defaultValue={settings[0]?.selectedPortfolio.toString()}
                // ={settings[0]?.selectedPortfolio.toString()}
              >
                {portfolios.map((item: PortfolioFields) => (
                  <Select.Option key={item.id} value={item.id.toString()}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </SettingsContext.Provider>
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
