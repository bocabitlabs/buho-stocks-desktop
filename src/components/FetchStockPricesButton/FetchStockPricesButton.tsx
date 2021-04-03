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
    console.log("On Click");
    for (let company of companies) {
      if (company.closed) {
        continue;
      }
      for (let year of years) {
        console.debug(`Fetching: ${company.ticker}`);
        const numberOfShares = company.shares.getCumulativeSharesCountUntilYear(
          year.toString()
        );
        // console.log(result)
        const initialDate = "01-12-" + year.toString();
        let endDate = "31-12-" + year.toString();

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
          console.debug(result);

          if (result === undefined || force) {
            console.debug(
              `Fetching stock price for ${company.name} of ${year}`
            );
            setCurrentMessage(
              `Fetching stock price for ${company.name} of ${year}`
            );

            const {
              found: stockPriceFound,
              data
            } = await StockPriceService.getHistoricStockPriceFromAPIStartEnd(
              initialDate,
              endDate,
              company.ticker
            );

            if (stockPriceFound) {
              let exchangeRatePrice = 1;
              const exchangeName =
                company.currencyAbbreviation +
                company.portfolioCurrencyAbbreviation;
              if (
                company.currencyAbbreviation !==
                company.portfolioCurrencyAbbreviation
              ) {
                console.log("Using exchage: " + exchangeName);
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

              if (data.close !== undefined && exchangeRatePrice !== undefined) {
                let price = data.close;
                if (exchangeName.startsWith("GBP")) {
                  price = data.close / 100;
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
        onCancel={()=> setIsModalVisible(!isModalVisible)}
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
