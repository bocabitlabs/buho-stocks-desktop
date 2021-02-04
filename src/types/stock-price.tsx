export interface StockPriceFormProps {
  price: number;
  transactionDate: string;
  companyId: string;
  exchangeRate: number;
}

export interface IStockPrice extends StockPriceFormProps {
  id: string;
}