import {
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
  Table,
  Typography
} from "antd";
import { Form } from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import ExchangeRateService from "services/exchange-rate";
import SharesTransactionsService from "services/shares-transactions-service";
import { IPortfolio } from "types/portfolio";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

interface Props {
  inputData: Array<string>;
  portfolio: IPortfolio;
}

export default function IBTradesImportForm({
  inputData,
  portfolio
}: Props): ReactElement {
  const [form] = Form.useForm();
  const [formSent, setFormSent] = useState(false);
  const key = "updatable";
  const companyName = inputData[5];

  const onFinish = (values: any) => {
    console.log("Finish:", values);
    const companyCurrency = inputData[4];
    const transactionDate = moment(values.transactionDate).format("DD/MM/YYYY");
    const portfolioCurrency = portfolio.currencyAbbreviation;

    const exchangeName = companyCurrency + portfolioCurrency;
    let exchangeRateValue = 1;
    if (companyCurrency !== portfolioCurrency) {
      console.log(transactionDate.replace(/\//g, "-"));
      const exchangeRate = ExchangeRateService.get(
        transactionDate.replace(/\//g, "-"),
        exchangeName
      );
      console.log(exchangeRate);
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

    console.log(exchangeName);
    console.log(transactionDate);
    console.log(commission);
    console.log(exchangeRateValue);

    const transaction: SharesTransactionFormProps = {
      count: values.count,
      price: values.price,
      commission: commission,
      exchangeRate: exchangeRateValue,
      transactionDate: moment(values.transactionDate).format("YYYY-MM-DD"),
      color: "#0066cc",
      notes: "",
      companyId: values.company,
      type: TransactionType.BUY
    };

    const added = SharesTransactionsService.create(transaction);

    if (added.changes) {
      message.success({ content: "Transaction has been added", key });
    } else {
      message.error({ content: "Unable to add the transaction", key });
    }

    setFormSent(true);
  };
  console.log(inputData);
  console.log(portfolio);

  const getCompanyFromTransaction = (name: string) => {
    console.log("Getting company from transaction:", name);
    const found = portfolio.companies.find((element) =>
      element.ticker.includes(name)
    );
    if (found) {
      return found.id;
    }
    return found;
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        commission: inputData[11],
        price: inputData[8],
        count: inputData[7],
        transactionDate: inputData[6],
        company: getCompanyFromTransaction(companyName)
      }}
    >
      <Row>
        <Typography.Title level={4}>
          {inputData[5]} ({inputData[4]})
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
            name="transactionDate"
            label="Date"
            rules={[{ required: true, message: "Please input your username!" }]}
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
