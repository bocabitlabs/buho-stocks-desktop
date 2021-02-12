import { Button, DatePicker, Form, InputNumber, message } from "antd";
import { CompaniesContext } from "contexts/companies";
import { useExchangeRate } from "hooks/use-exchange-rate";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import ExchangeRateService from "services/exchange-rate";
import StockPriceService from "services/stock-price-service";
import { IExchangeRateForm } from "types/exchange-rate";
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
  console.log("Loading exchange rate", exchangeName, transactionDate);
  const exchangeRate = useExchangeRate(exchangeName, transactionDate);

  useEffect(() => {
    if (company) {
      if (
        company.currencyAbbreviation !== undefined &&
        company.portfolioCurrencyAbbreviation !== undefined
      ) {
        setExchangeName(
          company.currencyAbbreviation + company.portfolioCurrencyAbbreviation
        );
      }
    }
  }, [company]);

  if (company === null) {
    return null;
  }

  const handleAdd = (values: any) => {
    const { price, transactionDate, exchangeRateValue } = values;

    const stockPrice: StockPriceFormProps = {
      price,
      exchangeRate: exchangeRateValue,
      transactionDate: moment(new Date(transactionDate)).format("YYYY-MM-DD"),
      companyId: company.id
    };
    console.log(values);
    const added = StockPriceService.add(stockPrice);
    if (added.changes) {
      const newExchangeRate: IExchangeRateForm = {
        transactionDate: transactionDate.format("DD-MM-YYYY"),
        exchangeName: exchangeName,
        exchangeValue: exchangeRateValue
      };
      console.log(newExchangeRate);
      const result = ExchangeRateService.add(newExchangeRate);
      console.log(result);

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
    console.log("Get exchange rate", exchangeName, transactionDate);
    let exchangeValue = 0;
    console.log(exchangeRate);
    if (exchangeRate !== null && exchangeRate !== undefined) {
      exchangeValue = exchangeRate.exchangeValue;
    }
    console.log("Set exchange rate:", exchangeValue);
    form.setFieldsValue({
      exchangeRateValue: exchangeValue
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
        name="exchangeRateValue"
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
