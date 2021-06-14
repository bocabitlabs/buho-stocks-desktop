import { IPortfolioInvestments } from "types/portfolio-parts/investments-part/investment-part";
import { company1 } from "../mocks/mock-data-1";
import { company2 } from "../mocks/mock-data-2";
// import {company1, company2} from "./mock-data"
import { PortfolioInvestment } from "./portfolio-investment";

describe("Portfolio Investment tests", () => {

  let portfolioInvestment: IPortfolioInvestments | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    portfolioInvestment = new PortfolioInvestment([company1, company2]);
  });

  test("get total invested one company", () => {
    // 33 + 33
    portfolioInvestment = new PortfolioInvestment([company1]);
    expect(portfolioInvestment?.getTotalInvested()).toStrictEqual(66);
  });

  test("get total invested two companies", () => {
    // 33 + 33
    // portfolioInvestment = new PortfolioInvestment([company1, company2]);
    expect(portfolioInvestment?.getTotalInvested()).toStrictEqual(132);
  });

  test("get total invested in portfolio currency", () => {
    expect(portfolioInvestment?.getTotalInvested(true)).toStrictEqual(66);
  });

  test("get total invested on year 2019", () => {
    const year = 2019;
    expect(portfolioInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(44);
  });

  test("get total invested on year 2020", () => {
    const year = 2020;
    expect(portfolioInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(44);
  });

  test("get total invested on year 2021", () => {
    const year = 2021;
    expect(portfolioInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(66);
  });

  test("get total invested on year 2019 in portfolio currency", () => {
    const year = 2019;
    expect(portfolioInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(22);
  });

  test("get total invested on year 2020 in portfolio currency", () => {
    const year = 2020;
    expect(portfolioInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(22);
  });

  test("get total invested on year 2021 in portfolio currency", () => {
    const year = 2021;
    expect(portfolioInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(33);
  });

  test("get total invested until year 2019", () => {
    const year = 2019;
    expect(portfolioInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(44);
  });

  test("get total invested until year 2020", () => {
    const year = 2020;
    expect(portfolioInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(88);
  });

  test("get total invested until year 2021", () => {
    const year = 2021;
    expect(portfolioInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(154);
  });

  test("get total invested until year 2019 in portfolio currency", () => {
    const year = 2019;
    expect(portfolioInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(22);
  });

  test("get total invested until year 2020 in portfolio currency", () => {
    const year = 2020;
    expect(portfolioInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(44);
  });

  test("get total invested until year 2021 in portfolio currency", () => {
    const year = 2021;
    expect(portfolioInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(77);
  });
});
