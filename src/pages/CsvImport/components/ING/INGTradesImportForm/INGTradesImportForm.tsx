import {
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Row,
  Select,
  Typography
} from "antd";
import { Form } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import CurrencyService from "services/currency-service";
import ExchangeRateService from "services/exchange-rate";
import RightsTransactionsService from "services/rights-transactions-service";
import SharesTransactionsService from "services/shares-transactions-service";
import TransactionLogService from "services/transaction-log-service";
import { Currency } from "types/currency";
import { IExchangeRate } from "types/exchange-rate";
import { IPortfolio } from "types/portfolio";
import { RightsTransactionFormProps } from "types/rights-transaction";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { TransactionType } from "types/transaction";
import {
  getCommission,
  getCompanyFromTransaction,
  getTotalAmountInCompanyCurrency
} from "../utils";

interface Props {
  inputData: Array<string>;
  portfolio: IPortfolio;
}

function formatINGRowForShares(inputData: string[]) {
  const transactionDate = moment(inputData[0], "DD/MM/YYYY");
  const validBuyTypes = ["COMPRA", "ALTA POR CANJE"];
  let transactionType = inputData[1];
  const companyName = inputData[3];
  const count = +inputData[6];
  const price = +inputData[7];
  let total = +inputData[9].replace("'", "");

  transactionType = validBuyTypes.includes(transactionType)
    ? TransactionType.BUY
    : TransactionType.SELL;

  return { companyName, total, transactionDate, count, price, transactionType };
}

export default function INGTradesImportForm({
  inputData,
  portfolio
}: Props): ReactElement {
  const [form] = Form.useForm();
  const [formSent, setFormSent] = useState(false);
  const [isRightsTransaction, setIsRightsTransaction] = useState(false);
  const key = "updatable";
  let exchangeRate: IExchangeRate | undefined;

  // Format all the fields
  let {
    companyName,
    total,
    transactionDate,
    count,
    price,
    transactionType
  } = formatINGRowForShares(inputData);

  // Get all the currencies
  const currencies = new CurrencyService().getCurrencies();
  // Try to find a suitable company
  const company = getCompanyFromTransaction(companyName, portfolio);
  // Get the transaction total in the company's currency
  if (company) {
    total = getTotalAmountInCompanyCurrency(total, company, transactionDate);
  }
  // Get the commission in the company's currency
  let commission = getCommission(total, count, price);
  // Get the exchange rate for the transaction
  const getExchangeRateForTransaction = () => {
    let newExchangeRate: IExchangeRate | undefined = undefined;
    if (company) {
      let temporalExchangeName =
        company.currencyAbbreviation + portfolio.currencyAbbreviation;
      newExchangeRate = ExchangeRateService.get(
        transactionDate.format("DD-MM-YYYY"),
        temporalExchangeName
      );
    }
    return newExchangeRate;
  };
  exchangeRate = getExchangeRateForTransaction();

  const onFinish = (values: any) => {
    //   const companyCurrency = inputData[4];
    let commission = values.commission;
    let added = null;

    if (isRightsTransaction) {
      const rightTransaction: RightsTransactionFormProps = {
        count: values.count,
        price: values.price,
        commission: commission,
        exchangeRate: exchangeRate ? exchangeRate.exchangeValue : 1,
        transactionDate: moment(values.transactionDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        ),
        color: "#0066cc",
        notes: "CSV imported from ING",
        companyId: values.company,
        type: values.transactionType
      };
      added = RightsTransactionsService.create(rightTransaction);
    } else {
      const transaction: SharesTransactionFormProps = {
        count: values.count,
        price: values.price,
        commission: commission,
        exchangeRate: exchangeRate ? exchangeRate.exchangeValue : 1,
        transactionDate: moment(values.transactionDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        ),
        color: "#0066cc",
        notes: `CSV imported from ING on ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
        companyId: values.company,
        type: values.transactionType
      };
      added = SharesTransactionsService.create(transaction);
    }

    if (added.changes) {
      if (company) {
        TransactionLogService.add({
          type: "Shares transaction",
          message: `Added shares from  ING CSV: "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
          portfolioId: +company.portfolioId
        });
      }
      message.success({ content: "Transaction has been added", key });
    } else {
      message.error({ content: "Unable to add the transaction", key });
    }
    setFormSent(true);
  };

  const isRightsTransactionChange = (event: CheckboxChangeEvent) => {
    setIsRightsTransaction(event.target.checked);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        commission: commission,
        price: price,
        count: count,
        transactionDate: transactionDate.format("DD/MM/YYYY"),
        currency: company ? company.currencyAbbreviation : "",
        transactionType: transactionType,
        company: company?.id
      }}
    >
      <Row>
        <Typography.Title level={4}>
          {inputData[1]} {companyName}
        </Typography.Title>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="count"
            label="Count"
            rules={[{ required: true, message: "Please input the company" }]}
          >
            <Input placeholder="Count" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="commission"
            label="Commission"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Commission" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select placeholder="Company">
              {portfolio.companies.map((element) => (
                <Select.Option key={element.id} value={element.id}>
                  {element.name} ({element.ticker})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select placeholder="Currency">
              {currencies.map((element: Currency) => (
                <Select.Option key={element.id} value={element.abbreviation}>
                  {element.name} ({element.abbreviation})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="transactionType"
            label="Type"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select placeholder="Type">
              <Select.Option
                key={TransactionType.BUY}
                value={TransactionType.BUY}
              >
                Buy
              </Select.Option>
              <Select.Option
                key={TransactionType.SELL}
                value={TransactionType.SELL}
              >
                Sell
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="transactionDate"
            label="Date"
            rules={[{ required: true, message: "Please input your username!" }]}
            help="Format: DD/MM/YYYY"
          >
            <Input placeholder="Date" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isRightsTransaction">
            <Checkbox onChange={isRightsTransactionChange}>
              Is a rights transaction
            </Checkbox>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={formSent}>
              Add transaction
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
