import { renderHook, act } from "@testing-library/react-hooks";
import CompanyDAO from "database/daos/company-dao/company-dao";
import PortfolioDAO from "database/daos/portfolio-dao/portfolio-dao";
import { PortfolioFormFields } from "types/portfolio";

import { usePortfoliosContext } from "./use-portfolios-context";

const mockExpectedReturnForGetId = {
  color: "#fff",
  companies: [],
  currencyAbbreviation: "USD",
  currencyCountryCode: "us",
  currencyId: 1,
  currencyName: "US Dolar",
  currencySymbol: "$",
  description: "This is description",
  name: "Portfolio Default",
  id: "1"
};

const newElement: PortfolioFormFields = {
  name: "Good company",
  description: "This is description",
  color: "#000",
  currencyId: 1
};

const mockCompany = { name: "Company 1", ticker: "IBM" };

jest.mock("database/daos/portfolio-dao/portfolio-dao", () => ({
  getAll: () => [],
  exportAll: () => [],
  getByName: () => ({}),
  getById: () => mockExpectedReturnForGetId,
  create: () => ({ changes: 1 }),
  getFirstTransaction: () => ({}),
  update: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 })
}));

jest.mock("yahoo-stock-prices-fetch", () => ({
  getCurrentData: () => jest.fn(),
  getHistoricalPrices: async () => [1, 2, 3]
}));

describe("usePortfoliosContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = SectorsService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  it("verifies that is loading is false when the component loads", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    expect(result.current.isLoading).toBe(false);
  });

  it("verifies that it loads with []", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    expect(result.current.portfolios.length).toBe(0);
  });

  it("verifies that it loads with no portfolio", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    expect(result.current.portfolio).toBe(null);
  });

  it("verifies that getAll returns the portfolios", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    act(() => {
      expect(result.current.getAll()).toEqual([]);
    });
  });

  it("verifies that getById returns the portfolio 1", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    const mockGetById = jest.spyOn(PortfolioDAO, "getById");
    mockGetById.mockImplementation(() => {
      return mockExpectedReturnForGetId;
    });
    const mockGetByIdCompany = jest.spyOn(CompanyDAO, "getAll");
    mockGetByIdCompany.mockImplementation(() => {
      return [mockCompany];
    });
    act(() => {
      const portfolio = result.current.getById("1")
      expect(portfolio?.currencyAbbreviation).toBe("USD");
      expect(portfolio?.currencyCountryCode).toBe("us");
      expect(portfolio?.name).toBe("Portfolio Default")
      expect(portfolio?.dividends).not.toBe(null)
      expect(portfolio?.investments).not.toBe(null)
      expect(portfolio?.returns).not.toBe(null)
      expect(portfolio?.value).not.toBe(null)
    });
  });

  it("verifies that the portfolio is set", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    const mockGetById = jest.spyOn(PortfolioDAO, "getById");
    mockGetById.mockImplementation(() => {
      return mockExpectedReturnForGetId;
    });
    const mockGetByIdCompany = jest.spyOn(CompanyDAO, "getAll");
    mockGetByIdCompany.mockImplementation(() => {
      return [mockCompany];
    });
    act(() => {
      result.current.getById("1");
    });
    expect(result.current.portfolio).not.toBe(null);
  });

  it("creates a portfolio and returns changes", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    act(() => {
      expect(result.current.create(newElement)).toEqual({"changes": 1});
    });
  });

  it("updates a portfolio and returns changes", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    act(() => {
      expect(result.current.update("1", newElement)).toEqual({"changes": 1});
    });
  });

  it("deletes a portfolio and returns changes", () => {
    const { result } = renderHook(() => usePortfoliosContext());
    act(() => {
      expect(result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });
});
