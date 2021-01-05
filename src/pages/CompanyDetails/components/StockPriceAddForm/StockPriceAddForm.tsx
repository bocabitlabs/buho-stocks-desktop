import { Button, DatePicker, Form, InputNumber, message } from "antd";
import moment from "moment";
import React, { ReactElement } from "react";
import StockPriceService from "services/stock-price-service";
import { StockPriceItemProps } from "types/stock-price";

interface Props {
  companyId: string;
  currencySymbol: string;
  onSuccess: Function;
}

export default function StockPriceAddForm({
  companyId,
  currencySymbol,
  onSuccess
}: Props): ReactElement {
  const [form] = Form.useForm();

  const dateFormat = "DD/MM/YYYY";
  const key = "updatable";

  const handleAdd = (values: any) => {
    const { priceShare, transactionDate } = values;

    const stockPrice: StockPriceItemProps = {
      priceShare,
      transactionDate: moment(new Date(transactionDate)).format("YYYY-MM-DD"),
      companyId
    };
    console.log(values);
    const added = new StockPriceService().add(stockPrice);
    if (added.changes) {
      message.success({
        content: "Stock price added",
        key,
        duration: 2
      });
      onSuccess();
    } else {
      message.error({
        content: "Unable to add stock price",
        key,
        duration: 2
      });
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="basic"
      onFinish={handleAdd}
      initialValues={{
        transactionDate: moment(new Date(), dateFormat)
      }}
    >
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
          formatter={(value) => `${currencySymbol} ${value}`}
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add stock price
        </Button>
      </Form.Item>
    </Form>
  );
}
