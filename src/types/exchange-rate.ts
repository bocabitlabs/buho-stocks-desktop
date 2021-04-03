export interface IExchangeRateForm{
  transactionDate: string;
  exchangeValue: number;
  exchangeName: string;
}

export interface IExchangeRate extends IExchangeRateForm{
  id: number;
}