import { IPortfolioValue } from "types/portfolio-parts/value-part/portfolio-value-part";
import { company1 } from "../mocks/mock-data-1";
import { company2 } from "../mocks/mock-data-2";
import { PortfolioValue } from "./portfolio-value-part";

describe("Portfolio value part tests", () => {

  let portfolioInvestment: IPortfolioValue | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    portfolioInvestment = new PortfolioValue([company1, company2]);
  });

  test("get total value for one company", () => {
    // 33 + 33
    portfolioInvestment = new PortfolioValue([company1]);
    expect(portfolioInvestment?.getPortfolioValue()).toStrictEqual(80);
  });

  test("get total invested two companies on 2019", () => {
    // 33 + 33
    // portfolioInvestment = new PortfolioInvestment([company1, company2]);
    const year = "2019"
    expect(portfolioInvestment?.getPortfolioValueForYear(year)).toStrictEqual(20);
  });

  test("get total invested two companies on 2020", () => {
    // 33 + 33
    // portfolioInvestment = new PortfolioInvestment([company1, company2]);
    const year = "2020"
    expect(portfolioInvestment?.getPortfolioValueForYear(year)).toStrictEqual(120);
  });

  test("get total invested two companies on 2021", () => {
    // 33 + 33
    // portfolioInvestment = new PortfolioInvestment([company1, company2]);
    const year = "2021"
    expect(portfolioInvestment?.getPortfolioValueForYear(year)).toStrictEqual(160);
  });

});
