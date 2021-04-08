import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Typography
} from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { SharesTransactionsContext } from "contexts/shares-transactions";
import ExchangeRateService from "services/exchange-rate";
import TransactionLogService from "services/transaction-log-service";

interface Props {
  companyId: string;
  transactionId?: string;
}

export default function SharesTransactionAddForm({
  companyId,
  transactionId
}: Props): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const {
    sharesTransaction,
    create: addTransaction,
    getAll: getAllSharesTransactions,
    getById,
    update: updateTransaction
  } = useContext(SharesTransactionsContext);
  const [color] = useState("#607d8b");
  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");
  const dateFormat = "DD/MM/YYYY";
  const key = "updatable";

  const [gettingExchangeRate, setGettingExchangeRate] = useState(false);
  const getExchangeRate = async () => {
    setGettingExchangeRate(true);
    const result = await ExchangeRateService.getFromAPI(
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

  useEffect(() => {
    if (transactionId) {
      getById(transactionId);
    }
  }, [transactionId, getById]);

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
      exchangeRate:
        company.currencyAbbreviation === company.portfolioCurrencyAbbreviation
          ? 1
          : exchangeRate,
      notes,
      color,
      companyId
    };
    let changes = null;
    let updateMessage = "";
    if (transactionId) {
      changes = updateTransaction(transactionId, transaction);
      updateMessage = "Shares transaction has been updated";
    } else {
      changes = addTransaction(transaction);
      updateMessage = "Shares transaction has been added";
    }
    if (changes.changes) {
      if (!transactionId) {
        TransactionLogService.create({
          type: "Shares transaction",
          message: `Added shares "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
          portfolioId: +company.portfolioId
        });
      }

      getAllSharesTransactions();
      history.push(
        `/portfolios/${company.portfolioId}/companies/${company.id}?tab=shares`
      );
      message.success({
        content: updateMessage,
        key
      });
    } else {
      message.error({ content: "Unable to add/edit the transaction", key });
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

  const updateFieldsForING = () => {
    const count = form.getFieldValue("count");
    const price = form.getFieldValue("price");
    let total = form.getFieldValue("total");
    const exchangeRate = form.getFieldValue("exchangeRate");

    total = total * (1 / exchangeRate);
    const totalInvested = +count * +price;
    let newCommission = total - totalInvested;

    if (newCommission < 0) {
      newCommission *= -1;
    }

    form.setFieldsValue({
      commission: newCommission
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAdd}
      initialValues={{
        count: sharesTransaction?.count,
        price: sharesTransaction?.price,
        commission: sharesTransaction?.commission,
        exchangeRate: sharesTransaction?.exchangeRate,
        notes: sharesTransaction?.notes,
        transactionDate: sharesTransaction
          ? moment(sharesTransaction.transactionDate)
          : moment(new Date(), dateFormat),
        type: sharesTransaction ? sharesTransaction.type : "BUY"
      }}
    >
      <Form.Item
        name="count"
        label="Number of Shares:"
        rules={[
          { required: true, message: "Please input the number of shares" }
        ]}
      >
        <InputNumber min={0} step={1} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price per share (Gross):"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          min={0}
          step={0.001}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name="type"
        label="Operation's type:"
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
        label="Total commission:"
        rules={[
          { required: true, message: "Please input the total commission" }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          formatter={(value) => `${company?.currencySymbol} ${value}`}
          min={0}
          step={0.001}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name="transactionDate"
        label="Operation's date:"
        rules={[
          { required: true, message: "Please input the date of the operation" }
        ]}
      >
        <DatePicker format={dateFormat} onChange={transactionDateChange} />
      </Form.Item>

      {company.currencyAbbreviation !==
        company.portfolioCurrencyAbbreviation && (
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="exchangeRate"
              label="Exchange rate:"
              rules={[
                { required: true, message: "Please input the exchange rate" }
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
      )}

      {company.broker.toLowerCase().includes("ing") && (
        <div>
          <Divider plain>Only ING</Divider>
          <Typography.Text type="secondary">
            ING doesn't include a commission field, so it needs to be
            calculated. Commission and price will be recalculated from total.
          </Typography.Text>

          <Form.Item name="total" label="Total (€):">
            <InputNumber
              decimalSeparator="."
              formatter={(value) => `€ ${value}`}
              min={0}
              step={0.001}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="button"
              onClick={updateFieldsForING}
            >
              Update Values from total
            </Button>
          </Form.Item>
          <Divider plain />
        </div>
      )}

      <Form.Item name="notes" label="Notes">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {transactionId ? "Edit Transaction" : "Add Transaction"}
        </Button>
      </Form.Item>
    </Form>
  );
}
