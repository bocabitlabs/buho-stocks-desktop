export interface StockPriceFormProps {
  price: number;
  transactionDate: string;
  companyId: string;
}

export interface IStockPrice extends StockPriceFormProps {
  id: string;
}