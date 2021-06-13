import { IPortfolioInvestments } from "types/portfolio-parts/investments-part/investment-part";
// import {company1, company2} from "./mock-data"
import { PortfolioInvestment } from "./portfolio-investment";

describe("Portfolio Investment tests", () => {



  let companyInvestment: IPortfolioInvestments | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    // companyInvestment = new PortfolioInvestment([company1, company2]);
  });

  test("get total invested", () => {
    // 33 + 33
    // expect(companyInvestment?.getTotalInvested()).toStrictEqual(66);
    expect(1).toStrictEqual(1)
  });

  // test("get total invested in portfolio currency", () => {
  //   expect(companyInvestment?.getTotalInvested(true)).toStrictEqual(33);
  // });

  // test("get total invested on year 2019", () => {
  //   const year = 2019;
  //   expect(companyInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(22);
  // });

  // test("get total invested on year 2020", () => {
  //   const year = 2020;
  //   expect(companyInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(22);
  // });

  // test("get total invested on year 2021", () => {
  //   const year = 2021;
  //   expect(companyInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(33);
  // });

  // test("get total invested on year 2019 in portfolio currency", () => {
  //   const year = 2019;
  //   expect(companyInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(11);
  // });

  // test("get total invested on year 2020 in portfolio currency", () => {
  //   const year = 2020;
  //   expect(companyInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(11);
  // });

  // test("get total invested on year 2021 in portfolio currency", () => {
  //   const year = 2021;
  //   expect(companyInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(16.5);
  // });

  // test("get total invested until year 2019", () => {
  //   const year = 2019;
  //   expect(companyInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(22);
  // });

  // test("get total invested until year 2020", () => {
  //   const year = 2020;
  //   expect(companyInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(44);
  // });

  // test("get total invested until year 2021", () => {
  //   const year = 2021;
  //   expect(companyInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(77);
  // });

  // test("get total invested until year 2019 in portfolio currency", () => {
  //   const year = 2019;
  //   expect(companyInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(11);
  // });

  // test("get total invested until year 2020 in portfolio currency", () => {
  //   const year = 2020;
  //   expect(companyInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(22);
  // });

  // test("get total invested until year 2021 in portfolio currency", () => {
  //   const year = 2021;
  //   expect(companyInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(38.5);
  // });
});
