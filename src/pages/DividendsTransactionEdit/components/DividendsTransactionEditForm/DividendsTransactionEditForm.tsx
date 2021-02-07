import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, InputNumber, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { useExchangeRate } from "hooks/use-exchange-rate";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";

interface Props {
  companyId: string;
  transactionId: string;
}

export default function DividendsTransactionEditForm({
  companyId,
  transactionId
}: Props): ReactElement | null {
  const key = "updatable";
  const [color] = useState("#607d8b");
  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");
  const exchangeRate = useExchangeRate(exchangeName, transactionDate);
  const history = useHistory();
  const [form] = Form.useForm();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const { dividendsTransaction, getById, update } = useContext(
    DividendsTransactionsContext
  );

  useEffect(() => {
    const newCompany = fetchCompany(companyId);
    if (newCompany) {
      if (
        newCompany.currencyAbbreviation !== undefined &&
        newCompany.portfolioCurrencyAbbreviation !== undefined
      ) {
        setExchangeName(
          newCompany.currencyAbbreviation +
            newCompany.portfolioCurrencyAbbreviation
        );
      }
    }

    getById(transactionId);
  }, [companyId, fetchCompany, transactionId, getById]);

  if (company === null || dividendsTransaction === null) {
    return null;
  }

  console.log(dividendsTransaction);

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
    const added = update(transactionId, dividend);
    console.log(added);
    if (added.changes) {
      history.push(
        `/portfolios/${company.portfolioId}/companies/${companyId}?tab=dividends`
      );
      message.success({ content: "Dividends transaction has been updated", key });
    } else {
      message.error({ content: "Unable to update the dividends transaction", key });
    }
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 }
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 0 }
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
      {...layout}
      form={form}
      name="basic"
      onFinish={handleAdd}
      initialValues={{
        count: dividendsTransaction.count,
        price: dividendsTransaction.price,
        commission: dividendsTransaction.commission,
        exchangeRate: dividendsTransaction.exchangeRate,
        notes: dividendsTransaction.notes,
        transactionDate: moment(dividendsTransaction.transactionDate)
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
        <DatePicker format={dateFormat} onChange={transactionDateChange} />
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
      <Form.Item name="notes" label="Notes">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Edit dividend
        </Button>
      </Form.Item>
    </Form>
  );
}
