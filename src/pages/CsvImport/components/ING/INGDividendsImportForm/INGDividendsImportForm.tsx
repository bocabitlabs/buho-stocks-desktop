import { Button, Col, Input, message, Row, Select, Typography } from "antd";
import { Form } from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import CurrencyService from "services/currency-service";
import DividendsTransactionsService from "services/dividends-transactions-service";
import { Currency } from "types/currency";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { IExchangeRate } from "types/exchange-rate";
import { IPortfolio } from "types/portfolio";
import {
  getCommission,
  getCompanyFromTransaction,
  getPriceInCompanyCurrency,
  getTotalAmountInCompanyCurrency
} from "../utils";

interface Props {
  inputData: Array<string>;
  portfolio: IPortfolio;
}

export default function INGDividendsImportForm({
  inputData,
  portfolio
}: Props): ReactElement {
  const [form] = Form.useForm();
  const [formSent, setFormSent] = useState(false);
  const key = "updatable";
  const transactionDate = moment(inputData[0], "DD/MM/YYYY");
  let exchangeRate: IExchangeRate | undefined;

  const companyName = inputData[3];
  const count = +inputData[6];
  let total = +inputData[9];
  let price = +inputData[7];
  // const commission = count * +inputData[7] - total;
  // const price = total / count;

  const currencies = new CurrencyService().getCurrencies();

  // Try to find a suitable company
  const company = getCompanyFromTransaction(companyName, portfolio);
  console.log("Company is ", company);

  // Get the transaction total in the company's currency

  console.log("Getting the total amount in Company Currency...");
  if (company) {
    console.log("Getting the total amount in Company Currency...");
    total = getTotalAmountInCompanyCurrency(total, company, transactionDate);
    price = getPriceInCompanyCurrency(price, company, transactionDate);
  }
  // Get the commission in the company's currency
  console.log("Get the commission");
  let commission = getCommission(total, count, price);

  const onFinish = (values: any) => {
    console.log("Finish:", values);
    //   const companyCurrency = inputData[4];
    const transaction: DividendsTransactionFormProps = {
      count: values.count,
      price: values.price,
      commission: values.commission,
      exchangeRate: exchangeRate ? exchangeRate.exchangeValue : 1,
      transactionDate: moment(values.transactionDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      color: "#0066cc",
      notes: "Csv imported from ING",
      companyId: values.company
    };
    console.log(transaction);
    const added = DividendsTransactionsService.create(transaction);
    if (added.changes) {
      message.success({ content: "Transaction has been added", key });
    } else {
      message.error({ content: "Unable to add the transaction", key });
    }
    setFormSent(true);
  };
  // console.log(inputData);
  // console.log(portfolio);

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
        company: company?.id
      }}
    >
      <Row>
        <Typography.Title level={5}>{companyName}</Typography.Title>
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
              {portfolio.companies.map((element, key) => (
                <Select.Option key={key} value={element.id}>
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
            name="transactionDate"
            label="Date"
            rules={[{ required: true, message: "Please input your username!" }]}
            help="Format: DD/MM/YYYY"
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