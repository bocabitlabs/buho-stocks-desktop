import React, {
  ReactElement,
  useContext,
  useEffect
} from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { CirclePicker } from "react-color";

import { useHistory } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import DividendsTransactionsService from "services/dividends-transactions-service";

interface Props {
  companyId: string;
}


export default function DividendAddForm({ companyId }: Props): ReactElement {
  const [form] = Form.useForm();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const history = useHistory();
  let color = "#607d8b";
  const key = "updatable";

  useEffect(() => {
    fetchCompany(companyId)
  }, [companyId, fetchCompany])

  const handleAdd = (values: any) => {
    const {
      count,
      price,
      commission,
      transactionDate,
      exchangeRate,
      notes
    } = values;

    const dividend: DividendsTransactionFormProps = {
      count,
      price,
      commission,
      transactionDate: moment(new Date(transactionDate)).format("YYYY-MM-DD"),
      exchangeRate,
      notes,
      color,
      companyId
    };
    console.log(values);
    const added = new DividendsTransactionsService().addDividendsTransaction(dividend);
    if (added.changes) {
      history.push(`/portfolios/${company?.portfolio}/companies/${companyId}?tab=dividends`);
      message.success({ content: "Dividend has been added", key });
    } else {
      message.error({ content: "Unable to add the dividend", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    color = color.hex;
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 }
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 0 }
  };
  const dateFormat = "DD/MM/YYYY";

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      onFinish={handleAdd}
      initialValues={{
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
        <InputNumber style={{ width: "20em" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Dividend per share"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          style={{ width: "20em" }}
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          min={0}
          step={0.001}
        />
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
        <DatePicker
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
          Add dividend
        </Button>
      </Form.Item>
    </Form>
  );
}
