import React, { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CompaniesContext } from "../../contexts/companies";
import moment from "moment";
import { CirclePicker } from "react-color";

import { SharesContext } from "../../contexts/shares";
import { ShareItemProps } from "../../types/share";

interface Props {
  companyId: string;
}

/**
 * Add a new Currency
 */
export default function AddShareForm({ companyId }: Props): ReactElement {
  const [form] = Form.useForm();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const { addShare } = useContext(SharesContext);
  const [color, setColor] = useState("#607d8b");


  const handleAdd = useCallback(async (values) => {
    const { sharesNumber, color, priceShare, type, commission, operationDate, exchangeRate, notes } = values;
    const share: ShareItemProps = {
      sharesNumber,
      priceShare,
      type,
      commission,
      operationDate,
      exchangeRate,
      notes,
      color,
      companyId
    };
    console.log(values);
    addShare(share);
    // Add company
  }, [addShare, companyId]);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 }
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 }
  };
  const dateFormat = "DD/MM/YYYY";

  return (
    <Form {...layout} form={form} name="basic" onFinish={handleAdd}
    initialValues={{
      type: 'BUY',
      operationDate: moment(new Date(), dateFormat),
    }}>
      {JSON.stringify(company)}
      <Form.Item
        name="sharesNumber"
        label="Number of Shares"
        rules={[
          { required: true, message: "Please input the number of shares" }
        ]}
      >
        <InputNumber style={{ width: "20em" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item
        name="priceShare"
        label="Price per share"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          style={{ width: "20em" }}
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          // parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
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
          style={{ width: "20em" }}
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          // parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
          min={0}
          step={0.001}
        />
      </Form.Item>
      <Form.Item
        name="operationDate"
        label="Operation's date"
        rules={[
          { required: true, message: "Please input the date of the operation" }
        ]}
      >
        <DatePicker
          defaultValue={moment(new Date(), dateFormat)}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        name="exchangeRate"
        label="Exchange rate"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          style={{ width: "20em" }}
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

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Add shares
        </Button>
      </Form.Item>
    </Form>
  );
}
