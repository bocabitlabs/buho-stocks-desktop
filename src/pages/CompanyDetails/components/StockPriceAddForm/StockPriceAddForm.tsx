import { Button, DatePicker, Form, InputNumber, message } from "antd";
import ExchangeRatesAPIClient from "api/exchange-rates/exchange-rates-api-client";
import { CompaniesContext } from "contexts/companies";
import { ExchangeRatesContext } from "contexts/exchange-rates";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import StockPriceService from "services/stock-price-service/stock-prices-service";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import { IExchangeRateForm } from "types/exchange-rate";
import { StockPriceFormProps } from "types/stock-price";

interface Props {
  currencySymbol: string;
  onSuccess: Function;
}

export default function StockPriceAddForm({
  currencySymbol,
  onSuccess
}: Props): ReactElement | null {
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const key = "updatable";
  const { company } = useContext(CompaniesContext);
  const { create: addExchangeRate } = useContext(ExchangeRatesContext);

  const [transactionDate, setTransactionDate] = useState<string>(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [exchangeName, setExchangeName] = useState<string>("");
  const [gettingLastPrices, setGettingLastPrices] = useState(false);

  useEffect(() => {
    if (company) {
      if (
        company.currencyAbbreviation !== undefined &&
        company.portfolioCurrencyAbbreviation !== undefined
      ) {
        setExchangeName(
          company.currencyAbbreviation + company.portfolioCurrencyAbbreviation
        );
      }
    }
  }, [company]);

  const [gettingExchangeRate, setGettingExchangeRate] = useState(false);
  const getExchangeRate = async () => {
    if (
      company?.currencyAbbreviation !== company?.portfolioCurrencyAbbreviation
    ) {
      setGettingExchangeRate(true);
      const result = await ExchangeRatesAPIClient.getHistoricalPrice(
        transactionDate,
        exchangeName
      );

      if (result) {
        form.setFieldsValue({
          exchangeRateValue: result.close
        });
      }
      setGettingExchangeRate(false);
    }
  };

  if (company === null) {
    return null;
  }

  const handleAdd = (values: any) => {
    const { price, transactionDate, exchangeRateValue } = values;

    const stockPrice: StockPriceFormProps = {
      price,
      exchangeRate: exchangeRateValue ? exchangeRateValue : 1,
      transactionDate: moment(new Date(transactionDate)).format("YYYY-MM-DD"),
      companyId: company.id
    };
    const added = StockPriceService.create(stockPrice);
    if (added.changes) {
      TransactionLogService.create({
        type: "Stock price",
        message: `Added stock price "${company.name} (${company.ticker})": ${price} - ${transactionDate}`,
        portfolioId: +company.portfolioId
      });

      const newExchangeRate: IExchangeRateForm = {
        transactionDate: transactionDate.format("DD-MM-YYYY"),
        exchangeName: exchangeName,
        exchangeValue: exchangeRateValue
      };
      console.debug(newExchangeRate);
      const result = addExchangeRate(newExchangeRate);
      console.debug(result);

      message.success({
        content: "Stock price added",
        key,
        duration: 2
      });
      onSuccess();
    } else {
      message.error({
        content: "Unable to add stock price",
        key,
        duration: 2
      });
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

  const getStockPrice = async () => {
    setGettingLastPrices(true);
    if (
      transactionDate ===
      moment(new Date(), "DD-MM-YYYY").format("DD-MM-YYYY")
    ) {
      getTodaysStockPrice();
    } else {
      getHistoricStockPrice();
    }
    getExchangeRate();
  };

  const getTodaysStockPrice = async () => {
    const { found, data } = await StockPriceService.getStockPriceAPI(
      company.ticker,
      company.alternativeTickers
    );

    if (found) {
      form.setFieldsValue({
        price: data?.price
      });
    }
    setGettingLastPrices(false);
  };

  const getHistoricStockPrice = async () => {
    const {
      found,
      data
    } = await StockPriceService.getHistoricStockPriceFromAPI(
      transactionDate,
      company.ticker
    );

    if (found) {
      form.setFieldsValue({
        price: data?.close
      });
    }
    setGettingLastPrices(false);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="basic"
      onFinish={handleAdd}
      initialValues={{
        transactionDate: moment(new Date(), dateFormat)
      }}
    >
      <Form.Item
        name="price"
        label="Price per share"
        rules={[
          { required: true, message: "Please input the price per share" }
        ]}
      >
        <InputNumber
          style={{ width: "20em" }}
          decimalSeparator="."
          formatter={(value) => `${currencySymbol} ${value}`}
          min={0}
          step={0.001}
        />
      </Form.Item>

      <Form.Item>
        <Button
          disabled={transactionDate === null || exchangeName === null}
          onClick={getStockPrice}
          loading={gettingLastPrices}
        >
          Get latest price
        </Button>
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
      {company.currencyAbbreviation !==
        company.portfolioCurrencyAbbreviation && (
        <div>
          <Form.Item
            name="exchangeRateValue"
            label="Exchange Rate"
            rules={[
              {
                required: true,
                message: "Please input the exchange rate for the given day"
              }
            ]}
          >
            <InputNumber
              style={{ width: "20em" }}
              decimalSeparator="."
              min={0}
              step={0.001}
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={transactionDate === null || exchangeName === null}
              onClick={getExchangeRate}
              loading={gettingExchangeRate}
            >
              Get exchange rate ({exchangeName})
            </Button>{" "}
          </Form.Item>
        </div>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add stock price
        </Button>
      </Form.Item>
    </Form>
  );
}
