import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { CirclePicker } from "react-color";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { SharesTransactionsContext } from "contexts/shares-transactions";

interface Props {
  companyId: string;
}

/**
 * Add a new Currency
 */
export default function ShareAddForm({
  companyId
}: Props): ReactElement | null {
  const [form] = Form.useForm();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const { addSharesTransaction } = useContext(SharesTransactionsContext);

  const history = useHistory();
  const [color, setColor] = useState("#607d8b");

  const key = "updatable";

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

  if (company === null) {
    return null;
  }

  const handleAdd = (values: any) => {
    const {
      count,
      price,
      type,
      commission,
      transactionDate,
      exchangeRate,
      notes
    } = values;

    const share: SharesTransactionFormProps = {
      count,
      price,
      type,
      commission,
      transactionDate: moment(new Date(transactionDate)).format("YYYY-MM-DD"),
      exchangeRate,
      notes,
      color,
      companyId
    };
    console.log(values);
    console.log("Adding the shares transaction")
    const added = addSharesTransaction(share);
    console.log(added);
    if (added.changes) {
      history.push(
        `/portfolios/${company.portfolioId}/companies/${company.id}?tab=shares`
      );
      message.success({ content: `Shares has been added: ${company.portfolioId}` , key });
    } else {
      message.error({ content: "Unable to add the shares", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
  };

  const dateFormat = "DD/MM/YYYY";

  return (
    <Form
      layout="vertical"
      form={form}
      name="basic"
      onFinish={handleAdd}
      initialValues={{
        type: "BUY",
        transactionDate: moment(new Date(), dateFormat)
      }}
    >
      <Form.Item
        name="count"
        label="Number of Shares"
        rules={[
          { required: true, message: "Please input the number of shares" }
        ]}
      >
        <InputNumber min={0} step={1} />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price per share"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          min={0}
          step={0.001}
        />
      </Form.Item>
      <Form.Item
        name="type"
        label="Operation's type"
        rules={[
          { required: true, message: "Please input the type of operation" }
        ]}
      >
        <Select placeholder="Select a option" style={{ width: "20em" }}>
          <Select.Option value="BUY">Buy</Select.Option>
          <Select.Option value="SELL">Sell</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="commission"
        label="Total commission"
        rules={[
          { required: true, message: "Please input the total commission" }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          min={0}
          step={0.001}
        />
      </Form.Item>
      <Form.Item
        name="transactionDate"
        label="Operation's date"
        rules={[
          { required: true, message: "Please input the date of the operation" }
        ]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        name="exchangeRate"
        label="Exchange rate"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          // formatter={(value) => `${company?.currencySymbol} ${value}`}
          // parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
          min={0}
          step={0.001}
        />
      </Form.Item>
      <Form.Item name="notes" label="Notes">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add shares
        </Button>
      </Form.Item>
    </Form>
  );
}
