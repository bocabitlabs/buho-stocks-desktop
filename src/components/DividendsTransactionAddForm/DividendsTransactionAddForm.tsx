import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, InputNumber, message, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import ExchangeRatesAPIClient from "api/exchange-rates/exchange-rates-api-client";

interface Props {
  companyId: string;
  transactionId?: string;
}

export default function DividendsTransactionAddForm({
  companyId,
  transactionId
}: Props): ReactElement | null {
  const key = "updatable";
  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");
  const [form] = Form.useForm();
  const history = useHistory();
  const [color] = useState("#607d8b");
  const [dividendsSymbol, setDividendsSymbol] = useState("?");

  const { company, getById: fetchCompany } = useContext(CompaniesContext);
  const { dividendsTransaction, create, getById, update } = useContext(
    DividendsTransactionsContext
  );
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    const newCompany = fetchCompany(companyId);
    console.debug(newCompany);
    if (newCompany) {
      if (
        newCompany.currencyAbbreviation !== undefined &&
        newCompany.portfolioCurrencyAbbreviation !== undefined
      ) {
        let dividendsCurrencyAbbreviation = newCompany.currencyAbbreviation;
        let dividendsCurrencySymbol = newCompany.currencySymbol;

        if (
          newCompany.dividendsCurrencyAbbreviation &&
          newCompany.dividendsCurrencyAbbreviation !==
            newCompany.portfolioCurrencyAbbreviation
        ) {
          dividendsCurrencyAbbreviation =
            newCompany.dividendsCurrencyAbbreviation;
          dividendsCurrencySymbol = newCompany.dividendsCurrencySymbol;
          setDividendsSymbol(dividendsCurrencySymbol);
        }
        setExchangeName(
          dividendsCurrencyAbbreviation +
            newCompany.portfolioCurrencyAbbreviation
        );
      }
    }
  }, [companyId, fetchCompany]);

  useEffect(() => {
    if (transactionId) {
      getById(transactionId);
    }
  }, [transactionId, getById]);

  const [gettingExchangeRate, setGettingExchangeRate] = useState(false);
  const getExchangeRate = async () => {
    setGettingExchangeRate(true);
    const result = await ExchangeRatesAPIClient.getHistoricalPrice(
      transactionDate,
      exchangeName
    );

    if (result) {
      form.setFieldsValue({
        exchangeRate: result.close
      });
    }
    setGettingExchangeRate(false);
  };

  if (company === null) {
    return null;
  }

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
    let changes = null;
    let updateMessage = "";
    if (transactionId) {
      changes = update(transactionId, dividend);
      updateMessage = "Dividends transaction has been updated";
    } else {
      changes = create(dividend);
      updateMessage = "Dividends transaction has been added";
    }
    if (changes.changes) {
      if (!transactionId) {
        TransactionLogService.create({
          type: "Dividends transaction",
          message: `Added dividends "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
          portfolioId: +company.portfolioId
        });
      }

      history.push(
        `/portfolios/${company?.portfolioId}/companies/${companyId}?tab=dividends`
      );
      message.success({
        content: updateMessage,
        key,
        style: {
          marginTop: "60px"
        }
      });
    } else {
      message.error({
        content: updateMessage,
        key,
        style: {
          marginTop: "60px"
        }
      });
    }
  };

  const transactionDateChange = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    const newDate = dateString.replace(/\//g, "-");
    setTransactionDate(newDate);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAdd}
      initialValues={{
        count: dividendsTransaction?.count,
        price: dividendsTransaction?.price,
        commission: dividendsTransaction?.commission,
        exchangeRate: dividendsTransaction?.exchangeRate,
        notes: dividendsTransaction?.notes,
        transactionDate: dividendsTransaction
          ? moment(dividendsTransaction?.transactionDate)
          : moment(new Date(), dateFormat)
      }}
    >
      <Form.Item
        name="count"
        label="Number of Shares"
        rules={[
          { required: true, message: "Please input the number of shares" }
        ]}
      >
        <InputNumber min={0} step={1} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Dividend per share"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          formatter={(value) => `${dividendsSymbol} ${value}`}
          min={0}
          step={0.001}
          style={{ width: "100%" }}
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
          decimalSeparator="."
          formatter={(value) => `${dividendsSymbol} ${value}`}
          min={0}
          step={0.001}
          style={{ width: "100%" }}
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
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="exchangeRate"
            label="Exchange rate"
            rules={[
              { required: true, message: "Please input the price per share" }
            ]}
          >
            <InputNumber
              decimalSeparator="."
              min={0}
              step={0.001}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="&nbsp;">
            <Button
              disabled={transactionDate === null || exchangeName === null}
              onClick={getExchangeRate}
              loading={gettingExchangeRate}
            >
              Get exchange rate ({exchangeName})
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="notes" label="Notes">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {transactionId ? "Edit Transaction" : "Add Transaction"}
        </Button>
      </Form.Item>
    </Form>
  );
}
