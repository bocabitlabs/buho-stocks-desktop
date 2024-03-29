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
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import ExchangeRatesAPIClient from "api/exchange-rates/exchange-rates-api-client";
import { useTranslation } from "react-i18next";

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
  const { company, getById: fetchCompany } = useContext(CompaniesContext);
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
  const { t } = useTranslation();

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
      updateMessage = t("Shares transaction has been updated");
    } else {
      changes = addTransaction(transaction);
      updateMessage = t("Shares transaction has been added");
    }
    if (changes.changes) {
      if (!transactionId) {
        TransactionLogService.create({
          type: t("Shares transaction"),
          message: `${t("Added shares")} "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
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
      message.error({ content: t("Unable to add/edit the transaction"), key });
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
        label={t("Number of shares")}
        rules={[
          { required: true, message: t("Please input the number of shares") }
        ]}
      >
        <InputNumber min={0} step={1} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="price"
        label={t("Gross price per share")}
        rules={[
          { required: true, message: t("Please input the price per share") }
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
        label={t("Operation's type")}
        rules={[
          { required: true, message: t("Please input the type of transaction") }
        ]}
      >
        <Select placeholder={t("Select an option")}>
          <Select.Option value="BUY">{t("Buy")}</Select.Option>
          <Select.Option value="SELL">{t("Sell")}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="commission"
        label={t("Total commission")}
        rules={[
          { required: true, message: t("Please input the total commission") }
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
        label={t("Transaction's date")}
        rules={[
          { required: true, message: t("Please input the date of the operation") }
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
              label="Exchange rate"
              rules={[
                { required: true, message: t("Please input the exchange rate") }
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
                {t("Get exchange rate")} ({exchangeName})
              </Button>
            </Form.Item>
          </Col>
        </Row>
      )}

      {company.broker.toLowerCase().includes("ing") && (
        <div>
          <Divider plain>{t("ING only")}</Divider>
          <Typography.Text type="secondary">
            {t(`ING doesn't include a commission field, so it needs to be calculated. Commission and price will be recalculated from total.`)}
          </Typography.Text>

          <Form.Item name="total" label={t("Total (€)")}>
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
              {t("Obtain Values from total")}
            </Button>
          </Form.Item>
          <Divider plain />
        </div>
      )}

      <Form.Item name="notes" label={t("Notes")}>
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {transactionId ? t("Edit transaction") : t("Add transaction")}
        </Button>
      </Form.Item>
    </Form>
  );
}
