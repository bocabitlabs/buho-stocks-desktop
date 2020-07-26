import React, { ReactElement, useCallback } from "react";
import { useFirestore } from "react-redux-firebase";
import { Form, Input, Button, Select } from "antd";
import { useSelector } from "react-redux";
import { getFirebaseAuth } from "../../selectors/profile";
import TextArea from "antd/lib/input/TextArea";
import { getCurrencies } from "../../selectors/currency";

/**
 * Add a new Currency
 */
function AddCompanyForm(): ReactElement | null {
  const firestore = useFirestore();
  const [form] = Form.useForm();
  const { uid }: any = useSelector(getFirebaseAuth);
  const currencies = useSelector(getCurrencies);

  const handleAddCompany = useCallback(
    async (values) => {
      const { link, name, ticker, market, currency, notes } = values;
      const company = {
        link: link,
        name: name,
        ticker: ticker,
        market: market,
        notes: notes,
        userId: uid,
        currency: currency
      };
      console.log(values);
      firestore
        .collection("users")
        .doc(uid)
        .collection("companies")
        .add(company);
    },
    [firestore, uid]
  );

  return (
    <Form form={form} name="basic" onFinish={handleAddCompany}>
      <Form.Item
        name="name"
        label="Company Name"
        rules={[
          { required: true, message: "Please input the name of the company" }
        ]}
      >
        <Input type="text" placeholder="Microsoft, AT&T ..." />
      </Form.Item>
      <Form.Item
        name="ticker"
        label="Ticker"
        rules={[
          { required: true, message: "Please input the company's ticker" }
        ]}
      >
        <Input type="text" placeholder="NASDQ:MSFT, NYSE:T..." />
      </Form.Item>
      <Form.Item
        name="market"
        label="Market Name"
        rules={[
          { required: true, message: "Please input the market of the company" }
        ]}
      >
        <Input type="text" placeholder="EEUU, Spain, UK..." />
      </Form.Item>
      <Form.Item name="link" label="Link">
        <Input type="text" placeholder="EEUU, Spain, UK..." />
      </Form.Item>
      <Form.Item
        name="notes"
        label="Notes"
        rules={[
          { required: true, message: "Please input the market of the company" }
        ]}
      >
        <TextArea placeholder="EEUU, Spain, UK..." />
      </Form.Item>
      <Form.Item name="currency" label="Currency" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {currencies &&
            currencies.map((currency, index) => (
              <Select.Option
                value={currency.id}
                key={`currency-${currency.id}-${index}`}
              >
                {currency.name} ({currency.abreviation})
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Company
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCompanyForm;
