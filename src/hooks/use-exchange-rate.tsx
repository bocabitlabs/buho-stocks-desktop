import { useEffect, useState } from "react";
import ExchangeRateService from "services/exchange-rate-service/exchange-rate";
import { IExchangeRate } from "types/exchange-rate";

export function useExchangeRate(
  exchangeName: string,
  transactionDate: string
): IExchangeRate | null {
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);

  useEffect(() => {
    if (transactionDate !== null && exchangeName !== null) {
      const result: IExchangeRate = ExchangeRateService.get(
        transactionDate,
        exchangeName
      );
      setExchangeRate(result);
    }
  }, [exchangeName, transactionDate]);

  return exchangeRate;
}
