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
import { ExchangeRatesContext } from "contexts/exchange-rates";
import moment from "moment";
import React, { ReactElement, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import CurrencyService from "services/currencies/currencies-service";
import RightsTransactionsService from "services/rights-transactions/rights-transactions-service";
import SharesTransactionsService from "services/shares-transactions/shares-transactions-service";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import { ICurrency } from "types/currency";
import { IExchangeRate } from "types/exchange-rate";
import { IPortfolio } from "types/portfolio";
import { RightsTransactionFormProps } from "types/rights-transaction";
import { SharesTransactionFormProps } from "types/shares-transaction";
import {
  getCommission,
  getCompanyFromTransaction,
  getTotalAmountInCompanyCurrency
} from "../../utils";

interface Props {
  inputData: Array<string>;
  portfolio: IPortfolio;
}

type TransactionType = "BUY"|"SELL";

interface FormattedINGRow {
  companyName: string;
  total: number;
  transactionDate: moment.Moment;
  count: number;
  price: number;
  transactionType: TransactionType;
}

/**
 * Handle each row on the ING's CSV format
 *
 * 0: transaction date: DD/MM/YYYY
 * 1: transaction type: COMPRA, ALTA POR CANJE
 * 3: company name: The name of the company (E.g VISCOFAN) or the name of the rights emission (E.g TEF.D 06.21)
 * 6: shares count: The number of shares affected by the transaction
 * 7: price: Price per share
 * 9: total: Total amount including commission
 *
 * @param inputData string[]
 * @returns
 */
function formatINGRowForShares(inputData: string[]): FormattedINGRow {
  const transactionDate = moment(inputData[0], "DD/MM/YYYY");
  const validBuyTypes = ["COMPRA", "ALTA POR CANJE"];
  let transactionType = inputData[1];
  const companyName = inputData[3];
  const count = +inputData[6];
  const price = +inputData[7];
  let total = +inputData[9].replace("'", "");

  transactionType = validBuyTypes.includes(transactionType) ? "BUY" : "SELL" ;

  return { companyName, total, transactionDate, count, price, transactionType: transactionType as TransactionType };
}

export default function INGTradesImportForm({
  inputData,
  portfolio
}: Props): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formSent, setFormSent] = useState(false);
  const [isRightsTransaction, setIsRightsTransaction] = useState(false);
  const { get: getExchangeRate } = useContext(ExchangeRatesContext);
  const key = "updatable";
  let exchangeRate: IExchangeRate | undefined | null;

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
  const currencies = CurrencyService.getAll();
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
    let newExchangeRate: IExchangeRate | undefined | null = undefined;
    if (company) {
      let temporalExchangeName =
        company.currencyAbbreviation + portfolio.currencyAbbreviation;
      newExchangeRate = getExchangeRate(
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
        notes: `CSV imported from ING on ${moment(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        )}`,
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
        notes: `CSV imported from ING on ${moment(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        )}`,
        companyId: values.company,
        type: values.transactionType
      };
      added = SharesTransactionsService.create(transaction);
    }

    if (added.changes) {
      if (company) {
        TransactionLogService.create({
          type: "Shares transaction",
          message: `Added shares from  ING CSV: "${company.name} (${company.ticker})": ${count} - ${price} - ${transactionDate}`,
          portfolioId: +company.portfolioId
        });
      }
      message.success({ content: t("Transaction has been added"), key });
    } else {
      message.error({ content: t("Unable to add the transaction"), key });
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
            label={t("Count")}
            rules={[
              { required: true, message: t("Please input the shares count") }
            ]}
          >
            <Input placeholder={t("Count")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label={t("Price")}
            rules={[{ required: true, message: t("Please input the price") }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="commission"
            label={t("Commission")}
            rules={[
              { required: true, message: t("Please input the commission") }
            ]}
          >
            <Input placeholder={t("Commission")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="company"
            label={t("Company")}
            rules={[{ required: true, message: t("Please input the company") }]}
          >
            <Select placeholder={t("Company")}>
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
            label={t("Currency")}
            rules={[
              { required: true, message: t("Please input the currency") }
            ]}
          >
            <Select placeholder={t("Currency")}>
              {currencies.map((element: ICurrency) => (
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
            label={t("Type")}
            rules={[
              { required: true, message: "Please input the transaction type" }
            ]}
          >
            <Select placeholder={t("Type")}>
              <Select.Option key={"BUY"} value={"BUY"}>
                {t("Buy")}
              </Select.Option>
              <Select.Option key={"SELL"} value={"SELL"}>
                {t("Sell")}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="transactionDate"
            label={t("Date")}
            rules={[
              {
                required: true,
                message: t("Please input the transaction date")
              }
            ]}
            help="Format: DD/MM/YYYY"
          >
            <Input placeholder={t("Date")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isRightsTransaction">
            <Checkbox onChange={isRightsTransactionChange}>
              {t("Is a rights transaction")}
            </Checkbox>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={formSent}>
              {t("Add transaction")}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
