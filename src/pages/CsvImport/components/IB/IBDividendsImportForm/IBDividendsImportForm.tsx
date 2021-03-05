import { Button, Col, Input, message, Row, Select, Typography } from "antd";
import { Form } from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import DividendsTransactionsService from "services/dividends-transactions-service";
import ExchangeRateService from "services/exchange-rate";
import TransactionLogService from "services/transaction-log-service";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { IPortfolio } from "types/portfolio";

interface Props {
  inputData: Array<string>;
  portfolio: IPortfolio;
  taxData: any;
}

export default function IBDividendsImportForm({
  inputData,
  portfolio,
  taxData
}: Props): ReactElement {
  const [form] = Form.useForm();
  const [formSent, setFormSent] = useState(false);
  const key = "updatable";

  const priceMatch = inputData[4].match(/[+-]?\d+(\.\d+)/);
  const companyNameMatch = inputData[4].match(/^(\w)+/g);
  let companyName = "";
  if (companyNameMatch) {
    companyName = companyNameMatch[0];
  }
  let notes = inputData[4];
  if (taxData) {
    notes += "." + taxData[4];
  }

  const total = +inputData[5];
  let count: number = 0;
  let price: number = 0;
  if (total && priceMatch && priceMatch[0]) {
    price = +priceMatch[0];
    count = total / price;
  }
  console.debug(taxData);

  const getCompanyFromTransaction = (name: string) => {
    const found = portfolio.companies.find((element) =>
      element.ticker.includes(name)
    );
    if (found) {
      return found;
    }
    return found;
  };

  const company = getCompanyFromTransaction(companyName);

  const onFinish = (values: any) => {
    const companyCurrency = inputData[2];
    const transactionDate = moment(values.transactionDate);
    const portfolioCurrency = portfolio.currencyAbbreviation;

    const exchangeName = companyCurrency + portfolioCurrency;
    let exchangeRateValue = 1;

    if (companyCurrency !== portfolioCurrency) {
      let exchangeRate = null;
      let tries = 1;
      let tempDate = transactionDate;
      do {
        exchangeRate = ExchangeRateService.get(
          tempDate.format("DD-MM-YYYY"),
          exchangeName
        );
        tempDate.add(tries, "days");
        tries++;
      } while (exchangeRate === undefined && tries < 5);

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

    const transaction: DividendsTransactionFormProps = {
      count: values.count,
      price: values.price,
      commission: commission,
      exchangeRate: exchangeRateValue,
      transactionDate: moment(values.transactionDate).format("YYYY-MM-DD"),
      color: "#0066cc",
      notes: values.notes,
      companyId: values.company
    };

    const added = DividendsTransactionsService.create(transaction);

    if (added.changes) {
      if (company) {
        TransactionLogService.add({
          type: "Dividends transaction",
          message: `Added dividends from  IB CSV: "${company.name} (${
            company.ticker
          })": ${count} - ${price} - ${transactionDate} on ${moment(
            new Date()
          ).format("YYYY-MM-DD HH:mm:ss")}`,
          portfolioId: +company.portfolioId
        });
      }
      message.success({ content: "Dividends has been added", key });
    } else {
      message.error({ content: "Unable to add the dividends", key });
    }

    setFormSent(true);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        commission: taxData ? taxData[5] * -1 : 0,
        price: price,
        count: Math.round(count),
        notes: notes,
        transactionDate: inputData[3],
        company: company?.id
      }}
    >
      {/* <div>
        <pre>{JSON.stringify(inputData)}</pre>
      </div> */}
      <Row>
        <Typography.Title level={4}>
          {companyName} - {inputData[2]}
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
          <Form.Item name="notes" label="Notes">
            <Input placeholder="Notes" />
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
              Add dividends
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
