import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { SharesTransactionsContext } from "contexts/shares-transactions";
import { useExchangeRate } from "hooks/use-exchange-rate";

interface Props {
  companyId: string;
}

export default function ShareAddForm({
  companyId
}: Props): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const { create } = useContext(SharesTransactionsContext);
  const [color,] = useState("#607d8b");
  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");
  const exchangeRate = useExchangeRate(exchangeName, transactionDate);

  const key = "updatable";

  useEffect(() => {
    const newCompany = fetchCompany(companyId);
    if (newCompany)
      if (
        newCompany.currencyAbbreviation !== undefined &&
        newCompany.portfolioCurrencyAbbreviation !== undefined
      ) {
        setExchangeName(
          newCompany.currencyAbbreviation +
            newCompany.portfolioCurrencyAbbreviation
        );
      }
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

    const transaction: SharesTransactionFormProps = {
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
    console.log("Adding the shares transaction");
    const added = create(transaction);
    console.log(added);
    if (added.changes) {
      history.push(
        `/portfolios/${company.portfolioId}/companies/${company.id}?tab=shares`
      );
      message.success({
        content: `Shares has been added: ${company.portfolioId}`,
        key
      });
    } else {
      message.error({ content: "Unable to add the shares", key });
    }
  };

  const dateFormat = "DD/MM/YYYY";

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
        <Select placeholder="Select a option">
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
        <DatePicker format={dateFormat} onChange={transactionDateChange} />
      </Form.Item>

      <Form.Item
        name="exchangeRate"
        label="Exchange rate"
        rules={[{ required: true, message: "Please input the exchange rate" }]}
      >
        <InputNumber decimalSeparator="." min={0} step={0.001} />
      </Form.Item>
      <Button
        disabled={transactionDate === null || exchangeName === null}
        onClick={getExchangeRate}
      >
        Get exchange rate ({exchangeName})
      </Button>
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
