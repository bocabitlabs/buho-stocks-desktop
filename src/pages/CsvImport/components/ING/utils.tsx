import ExchangeRateService from "services/exchange-rate";
import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";
import { Moment } from "moment";

const normalizeAndRemoveAccents = (inputString: string) => {
  return inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const getCompanyFromTransaction = (
  name: string,
  portfolio: IPortfolio
): ICompany | undefined => {
  console.log("Getting company from transaction:", name);
  const found = portfolio.companies.find((element) =>
    normalizeAndRemoveAccents(element.name)
      .toLowerCase()
      .includes(normalizeAndRemoveAccents(name).toLowerCase())
  );
  console.log("Company found?", found);
  if (found) {
    return found;
  }
  return found;
};

export const getTotalAmountInCompanyCurrency = (
  initialTotal: number,
  company: ICompany,
  transactionDate: Moment
) => {
  const INGDefaultCurrency = "EUR";
  let totalInCompanyCurrency = initialTotal;
  if (company && company.currencyAbbreviation !== "EUR") {
    // First, exchage it to EUR, which is the ING total's currency
    let temporalExchangeName =
      INGDefaultCurrency + company.currencyAbbreviation;
    const newExchangeRate = ExchangeRateService.get(
      transactionDate.format("DD-MM-YYYY"),
      temporalExchangeName
    );
    if (newExchangeRate) {
      totalInCompanyCurrency = initialTotal * newExchangeRate.exchangeValue;
    }
  }
  return totalInCompanyCurrency;
};

export const getPriceInCompanyCurrency = (
  initialPrice: number,
  company: ICompany,
  transactionDate: Moment
) => {
  console.log("Get total amount in company currency");
  const INGDefaultCurrency = "EUR";
  if (company && company.currencyAbbreviation !== INGDefaultCurrency) {
    // First, exchage it to EUR, which is the ING total's currency
    let temporalExchangeName =
      INGDefaultCurrency + company.currencyAbbreviation;
    const newExchangeRate = ExchangeRateService.get(
      transactionDate.format("DD-MM-YYYY"),
      temporalExchangeName
    );
    if (newExchangeRate) {
      const price: number = initialPrice * newExchangeRate.exchangeValue;
      return price;
    }
  }
  return initialPrice;
};

export function getCommission(total: number, count: number, price: number) {
  let commission = total - count * price;
  if (commission < 0) {
    commission = commission * -1;
  }
  return commission;
}
