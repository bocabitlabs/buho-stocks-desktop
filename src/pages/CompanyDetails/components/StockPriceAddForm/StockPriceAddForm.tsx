import { Button, DatePicker, Form, InputNumber, message } from "antd";
import { CompaniesContext } from "contexts/companies";
import { useExchangeRate } from "hooks/use-exchange-rate";
import moment from "moment";
import React, { ReactElement, useContext, useState } from "react";
import StockPriceService from "services/stock-price-service";
import { StockPriceFormProps } from "types/stock-price";

interface Props {
  currencySymbol: string;
  onSuccess: Function;
}

export default function StockPriceAddForm({
  currencySymbol,
  onSuccess
}: Props): ReactElement | null {
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const key = "updatable";
  const { company } = useContext(CompaniesContext);
  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");
  const exchangeRate = useExchangeRate(exchangeName, transactionDate);

  if (company === null) {
    return null;
  }

  const handleAdd = (values: any) => {
    const { price, transactionDate, exchangeRate } = values;

    const stockPrice: StockPriceFormProps = {
      price,
      exchangeRate,
      transactionDate: moment(new Date(transactionDate)).format("YYYY-MM-DD"),
      companyId: company.id
    };
    console.log(values);
    const added = StockPriceService.add(stockPrice);
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

  const transactionDateChange = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    const newDate = dateString.replace(/\//g, "-");
    setTransactionDate(newDate);
    if (
      company.currencyAbbreviation !== undefined &&
      company.portfolioCurrencyAbbreviation !== undefined
    ) {
      setExchangeName(
        company.currencyAbbreviation + company.portfolioCurrencyAbbreviation
      );
    }
  };

  const getExchangeRate = () => {
    let exchangeValue = 0;
    if (exchangeRate !== null && exchangeRate !== undefined) {
      exchangeValue = exchangeRate.exchangeValue;
    }
    form.setFieldsValue({
      exchangeRate: exchangeValue
    });
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
        name="price"
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
        <DatePicker format={dateFormat} onChange={transactionDateChange} />
      </Form.Item>

      <Form.Item
        name="exchangeRate"
        label="Exchange Rate"
        rules={[
          {
            required: true,
            message: "Please input the exchange rate for the given day"
          }
        ]}
      >
        <InputNumber
          style={{ width: "20em" }}
          decimalSeparator="."
          min={0}
          step={0.001}
        />
      </Form.Item>
      <Button
        disabled={transactionDate === null || exchangeName === null}
        onClick={getExchangeRate}
      >
        Get exchange rate ({exchangeName})
      </Button>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add stock price
        </Button>
      </Form.Item>
    </Form>
  );
}
