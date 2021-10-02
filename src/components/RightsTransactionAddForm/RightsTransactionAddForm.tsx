import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { RightsTransactionFormProps } from "types/rights-transaction";
import { RightsTransactionContext } from "contexts/rights-transactions";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import ExchangeRatesAPIClient from "api/exchange-rates/exchange-rates-api-client";
import { useTranslation } from "react-i18next";

interface Props {
  companyId: string;
  transactionId?: string;
}

/**
 * Add a new Rights Transaction
 */
export default function RightsTransactionAddForm({
  companyId,
  transactionId
}: Props): ReactElement | null {
  // Hooks
  const [form] = Form.useForm();
  const { company, getById: fetchCompany } = useContext(CompaniesContext);
  const { create, getById, getAll, rightsTransaction, update } = useContext(
    RightsTransactionContext
  );
  const history = useHistory();
  const { t } = useTranslation();

  // State
  const [color] = useState("#607d8b");
  const key = "updatable";
  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");

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

  const handleSubmit = (values: any) => {
    const {
      count,
      price,
      type,
      commission,
      transactionDate,
      exchangeRate,
      notes
    } = values;

    const transaction: RightsTransactionFormProps = {
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
    let changes = null;
    let updateMessage = "";
    if (transactionId) {
      changes = update(transactionId, transaction);
      updateMessage = t("Rights transaction has been updated");
    } else {
      changes = create(transaction);
      updateMessage = t("Rights transaction has been added");
    }
    if (changes.changes) {

      if(!transactionId){
        TransactionLogService.create({
          type: t("Rights transaction"),
          message: `${t("Added rights")} "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
          portfolioId: +company.portfolioId
        });
      }

      getAll();
      history.push(
        `/portfolios/${company?.portfolioId}/companies/${companyId}?tab=rights`
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
        content: t("Unable to add/edit the transaction"),
        key,
        style: {
          marginTop: "60px"
        }
      });
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

  const updateFieldsForING = () => {
    console.debug("Update fields for ING");
    const count = form.getFieldValue("count");
    const price = form.getFieldValue("price");
    const total = form.getFieldValue("total");

    console.debug(count, price, total);

    const totalAmount = +total.replace("'", "");
    console.debug(totalAmount, +count * +price);
    let newCommission = totalAmount - +count * +price;

    newCommission = +count * +price - totalAmount;

    if (newCommission < 0) {
      newCommission *= -1;
    }

    console.debug(count, totalAmount, newCommission);

    form.setFieldsValue({
      commission: newCommission
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        count: rightsTransaction?.count,
        price: rightsTransaction?.price,
        commission: rightsTransaction?.commission,
        exchangeRate: rightsTransaction?.exchangeRate,
        notes: rightsTransaction?.notes,
        transactionDate: rightsTransaction
          ? moment(rightsTransaction.transactionDate)
          : moment(new Date(), dateFormat),
        type: rightsTransaction ? rightsTransaction.type : "BUY"
      }}
    >
      <Form.Item
        name="count"
        label={t("Number of Rights")}
        rules={[
          { required: true, message: t("Please input the number of rights") }
        ]}
      >
        <InputNumber min={0} step={1} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="price"
        label={t("Price per right")}
        rules={[
          { required: true, message: t("Please input the price per right") }
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
        <Select placeholder={t("Select a option")} style={{ width: "20em" }}>
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
          { required: true, message: t("Please input the date of the transaction") }
        ]}
      >
        <DatePicker format={dateFormat} onChange={transactionDateChange} />
      </Form.Item>
      <Form.Item
        name="exchangeRate"
        label={t("Exchange rate")}
        rules={[
          { required: true, message: t("Please input the exchange rate") }
        ]}
      >
        <InputNumber
          decimalSeparator="."
          min={0}
          step={0.001}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={transactionDate === null || exchangeName === null}
          onClick={getExchangeRate}
          loading={gettingExchangeRate}
        >
          {t("Get exchange rate")} ({exchangeName})
        </Button>
      </Form.Item>

      {company.broker.toLowerCase().includes("ing") && (
        <div>
          <Divider plain>{t("ING only")}</Divider>
          <Typography.Text type="secondary">
            {t(`ING doesn't include a commission field, so it needs to be calculated. Commission and price will be recalculated from total.`)}
          </Typography.Text>
          <Form.Item name="total" label={t("Total")}>
            <Input style={{ width: "20em" }} />
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
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {transactionId ? t("Edit transaction") : t("Add transaction")}
        </Button>
      </Form.Item>
    </Form>
  );
}
