import { Transaction } from "./transaction";

export interface DividendsTransactionFormProps extends Transaction {
}

export interface DividendsTransaction extends DividendsTransactionFormProps{
  id: string;
  currencyName?: string;
  currencySymbol?: string;
}

export interface YearlyDividendFields {
  year: string;
  companyId: string;
  sharesNumber: number;
  dividendsGross: number;
  dividendsGrossBaseCurrency: number;
  dividendsNet: number;
  dividendsNetBaseCurrency: number;
  dividendsCommission: number;
}