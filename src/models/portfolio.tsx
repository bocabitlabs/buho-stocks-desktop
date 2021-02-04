import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";

export class Portfolio implements IPortfolio {
  id: string;
  currencySymbol: string;
  currencyName: string;
  name: string;
  description: string;
  color: string;
  currencyId: number;
  companies: ICompany[];

  constructor(parameters: IPortfolio) {
    this.id = parameters.id;
    this.currencySymbol = parameters.currencySymbol;
    this.currencyName = parameters.currencyName;
    this.name = parameters.name;
    this.description = parameters.description;
    this.color = parameters.color;
    this.currencyId = parameters.currencyId;
    this.companies = parameters.companies;
  }

  getPortfolioValueWithInflation(inBaseCurrency = false): number {
    console.log("Portfolio companies", this.companies);
    const totalPortfolioValue = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getPortfolioValueWithInflation(true);
      }
      return accumulator + obj.getPortfolioValueWithInflation();
    },
    0);
    return totalPortfolioValue;
  }
}
