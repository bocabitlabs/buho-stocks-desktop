import React, { ReactElement, useCallback } from "react";
import { Button, Form, Input } from "antd";
import { getFirebaseAuth } from "../../selectors/profile";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";

/**
 * Add a new Currency
 */
function AddCurrencyForm(): ReactElement {
  const firestore = useFirestore();
  const [form] = Form.useForm();
  const { uid }: any = useSelector(getFirebaseAuth);

  const handleAddCurrency = useCallback(
    async (values) => {
      const { currencyName, abbreviation, symbol } = values;
      const currency = {
        name: currencyName,
        abreviation: abbreviation,
        symbol: symbol,
        userId: uid
      };
      firestore
        .collection("users")
        .doc(uid)
        .collection("currencies")
        .add(currency);
    },
    [firestore, uid]
  );

  return (
    <Form form={form} name="basic" onFinish={handleAddCurrency}>
      <Form.Item
        name="currencyName"
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
          Add Currency
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCurrencyForm;
