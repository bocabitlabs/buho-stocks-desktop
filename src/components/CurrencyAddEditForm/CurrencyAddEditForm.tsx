import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { CirclePicker } from "react-color";

import { useHistory } from "react-router-dom";
import { CurrenciesContext } from "contexts/currencies";
import CountrySelector from "components/CountrySelector/CountrySelector";

interface AddEditFormProps {
  currencyId?: string;
}

/**
 * Add a new Currency
 */
function CurrencyAddEditForm({
  currencyId
}: AddEditFormProps): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const [color, setColor] = useState("#607d8b");
  const [country, setCountry] = useState("");

  const {
    currency,
    addCurrency,
    fetchCurrencies,
    getById: getCurrencyById,
    update: updateCurrency
  } = useContext(CurrenciesContext);
  const key = "updatable";

  useEffect(() => {
    if (currencyId) {
      const newCurrency = getCurrencyById(currencyId);
      if (newCurrency) {
        setColor(newCurrency.color);
        setCountry(newCurrency.country);
      }
    }
  }, [currencyId, getCurrencyById]);

  const handleSubmit = (values: any) => {
    const { name, abbreviation, symbol } = values;
    const newCurrency = {
      name,
      abbreviation,
      symbol,
      country,
      color
    };
    //Add the currency
    let changes = null;
    if (currencyId) {
      changes = updateCurrency(currencyId, newCurrency);
    } else {
      changes = addCurrency(newCurrency);
    }

    if (changes.changes) {
      fetchCurrencies();
      if (!currencyId) {
        message.success({ content: "Currency has been added", key });
      } else {
        message.success({ content: "Currency has been updated", key });
      }
      history.push("/currencies");
    } else {
      message.success({ content: "Unable to add the currency", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  };

  const handleCountryChange = (code: string) => {
    console.debug(code);
    setCountry(code);
  };

  if (currencyId && !currency) {
    return null;
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        name: currency?.name,
        abbreviation: currency?.abbreviation,
        symbol: currency?.symbol,
        country: currency?.country
      }}
    >
      <Form.Item
        name="name"
        label="Currency Name"
        rules={[
          { required: true, message: "Please input the name of the currency" }
        ]}
      >
        <Input type="text" placeholder="EURO, Dolar, Pound..." />
      </Form.Item>
      <Form.Item
        name="abbreviation"
        label="Abbreviation"
        rules={[
          { required: true, message: "Please input the currency abbreviation" }
        ]}
      >
        <Input type="text" placeholder="EUR, USD, GBP..." />
      </Form.Item>
      <Form.Item name="region" label="Country">
        <CountrySelector
          handleChange={handleCountryChange}
          initialValue={currency?.country}
        />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker color={color} onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item
        name="symbol"
        label="Symbol"
        rules={[
          { required: true, message: "Please input the currency symbol" }
        ]}
      >
        <Input type="text" placeholder="€, $, £..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {currencyId ? "Edit Currency" : "Add Currency"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CurrencyAddEditForm;