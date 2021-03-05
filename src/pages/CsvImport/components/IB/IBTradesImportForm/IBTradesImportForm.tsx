import {
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
  Typography
} from "antd";
import { Form } from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import ExchangeRateService from "services/exchange-rate";
import SharesTransactionsService from "services/shares-transactions-service";
import TransactionLogService from "services/transaction-log-service";
import { IPortfolio } from "types/portfolio";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

interface Props {
  inputData: Array<string>;
  portfolio: IPortfolio;
}

const getCompanyFromTransaction = (name: string, portfolio: IPortfolio) => {
  const found = portfolio.companies.find((element) =>
    element.ticker.includes(name)
  );
  if (found) {
    return found;
  }
  return found;
};

export default function IBTradesImportForm({
  inputData,
  portfolio
}: Props): ReactElement {
  const [form] = Form.useForm();
  const [formSent, setFormSent] = useState(false);
  const key = "updatable";

  const companyName = inputData[5];
  const companyCurrency = inputData[4];
  const count = +inputData[7]
  const transactionDate = moment(inputData[6]);
  const price = +inputData[8];
  let commission = +inputData[11];
  if (commission < 0) {
    commission = commission * -1;
  }

  const company = getCompanyFromTransaction(companyName, portfolio);

  const onFinish = (values: any) => {
    const transactionDate = moment(values.transactionDate, "DD/MM/YYYY");
    const portfolioCurrency = portfolio.currencyAbbreviation;

    const exchangeName = companyCurrency + portfolioCurrency;
    let exchangeRateValue = 1;
    if (companyCurrency !== portfolioCurrency) {
      const formattedTransactionDate = transactionDate.format("DD/MM/YYYY");
      const exchangeRate = ExchangeRateService.get(
        formattedTransactionDate.replace(/\//g, "-"),
        exchangeName
      );
      if (exchangeRate !== undefined) {
        exchangeRateValue = exchangeRate.exchangeValue;
      } else {
        exchangeRateValue = 1;
      }
    }

    let commission = values.commission;
    if (commission < 0) {
      commission = commission * -1;
    }

    const transaction: SharesTransactionFormProps = {
      count: values.count,
      price: values.price,
      commission: commission,
      exchangeRate: exchangeRateValue,
      transactionDate: transactionDate.format("YYYY-MM-DD"),
      color: "#0066cc",
      notes: `Imported from IB CSV on ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
      companyId: values.company,
      type: TransactionType.BUY
    };
    console.debug(transactionDate)
    console.debug(transaction)

    const added = SharesTransactionsService.create(transaction);

    if (added.changes) {
      if (company) {
        TransactionLogService.add({
          type: "Shares transaction",
          message: `Added shares from  IB CSV: "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
          portfolioId: +company.portfolioId
        });
      }
      setFormSent(true);
      message.success({ content: "Transaction has been added", key });
    } else {
      message.error({ content: "Unable to add the transaction", key });
    }

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
        company: company?.id
      }}
    >
      <Row>
        <Typography.Title level={4}>
          {companyName} ({companyCurrency})
        </Typography.Title>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="count"
            label="Count"
            rules={[{ required: true, message: "Please input the company" }]}
            help={`Received: ${inputData[7]}`}
          >
            <Input placeholder="Count" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input your username!" }]}
            help={`Received: ${inputData[8]}`}
          >
            <Input placeholder="Price" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="commission"
            label="Commission"
            rules={[{ required: true, message: "Please input your username!" }]}
            help={`Received: ${inputData[11]}`}
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
            name="transactionDate"
            label="Date"
            rules={[{ required: true, message: "Please input your username!" }]}
            help={`Received: ${inputData[6]}`}
          >
            <Input placeholder="Date" />
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
