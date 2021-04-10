import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal } from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import ExchangeRateService from "services/exchange-rate";
import StockPriceService from "services/stock-price-service";
import { ICompany } from "types/company";
import { StockPriceFormProps } from "types/stock-price";

interface Props {
  companies: ICompany[];
  years: number[];
}

export default function FetchStockPricesButton({
  companies,
  years
}: Props): ReactElement {
  const [loading, setLoading] = useState(false);
  const [force, setForce] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("Start Fetching");

  const handleOnClick = async () => {
    setLoading(true);
    for (let company of companies) {
      if (company.closed) {
        continue;
      }
      for (let year of years) {
        console.debug(`Fetching: ${company.ticker}`);
        const numberOfShares = company.shares.getCumulativeSharesCountUntilYear(
          year.toString()
        );
        var currentYear = moment().format("YYYY");

        let initialDate = "01-12-" + year.toString();
        let endDate = "31-12-" + year.toString();

        console.debug(`${initialDate} to ${endDate}`);

        // const currentDate = moment(new Date(), "DD-MM-YYYY")
        // const endDateMoment = moment(endDate, "DD-MM-YYYY")
        console.debug(
          `Fetching: ${company.name}: numberOfShares=${numberOfShares} year=${year}`
        );
        if (numberOfShares > 0) {
          const result = StockPriceService.getLastStockPricePerYearByCompanyId(
            company.id,
            year.toString()
          );

          if (result === undefined || force) {
            console.debug(
              `Fetching stock price for ${company.name} of ${year}`
            );
            setCurrentMessage(
              `Fetching stock price for ${company.name} of ${year}`
            );

            let stockPriceFound = false;
            let retrievedData = null;
            if (year.toString() === currentYear) {
              initialDate = moment().subtract(1, "week").format("DD-MM-YYYY");
              endDate = moment().format("DD-MM-YYYY");
              let { found, data } = await StockPriceService.getStockPriceAPI(
                company.ticker,
                company.alternativeTickers
              );
              stockPriceFound = found;
              retrievedData = data;
            } else {
              let {
                found,
                data
              } = await StockPriceService.getHistoricStockPriceFromAPIStartEnd(
                initialDate,
                endDate,
                company.ticker
              );
              stockPriceFound = found;
              retrievedData = data;
            }
            console.debug("Retrieved data: ");
            console.debug(retrievedData);

            if (stockPriceFound) {
              let exchangeRatePrice = 1;
              const exchangeName =
                company.currencyAbbreviation +
                company.portfolioCurrencyAbbreviation;
              if (
                company.currencyAbbreviation !==
                company.portfolioCurrencyAbbreviation
              ) {
                const exchageRate = await ExchangeRateService.getFromAPIWeekly(
                  initialDate,
                  endDate,
                  exchangeName
                );
                if (exchageRate) {
                  exchangeRatePrice = exchageRate.close;
                } else {
                  setMessages((messages) => [
                    ...messages,
                    `Unable to fetch exchange rate ${exchangeName} for ${company.name} of ${year}`
                  ]);
                }
              }
              let price = undefined;
              if (retrievedData.close !== undefined) {
                price = retrievedData.close;
              }
              if (retrievedData.price !== undefined) {
                price = retrievedData.price;
              }

              if (price !== undefined && exchangeRatePrice !== undefined) {
                if (exchangeName.startsWith("GBP")) {
                  price = price / 100;
                }
                const stockPrice: StockPriceFormProps = {
                  price: price,
                  exchangeRate: exchangeRatePrice,
                  transactionDate: moment(endDate, "DD-MM-YYYY").format(
                    "YYYY-MM-DD"
                  ),
                  companyId: company.id
                };
                StockPriceService.add(stockPrice);
              }
            } else {
              setMessages((messages) => [
                ...messages,
                `Stock price not found for ${company.name} on ${year}`
              ]);
            }
          }
        }
      }
    }
    setLoading(false);
    setCurrentMessage("Start Fetching");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        icon={<ReloadOutlined />}
        onClick={showModal}
        title={"Fetch stock prices"}
      />
      <Modal
        title="Update stock prices"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(!isModalVisible)}
        footer={[
          <Button key="back" onClick={handleOk}>
            Close
          </Button>
        ]}
      >
        <p>
          Fetch the stock prices for each year for each one of the companies in
          this portfolio.
        </p>
        <p>
          <Checkbox onChange={() => setForce(!force)}>
            Force the update
          </Checkbox>
        </p>
        <Button type="primary" loading={loading} onClick={handleOnClick}>
          {currentMessage}
        </Button>
        <ul>
          {messages.map((element, index) => (
            <li key={"index" + index}>{element}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
