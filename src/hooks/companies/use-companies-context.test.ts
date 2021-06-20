import { renderHook, act } from "@testing-library/react-hooks";
import { CompanyFormFields } from "types/company";

import { useCompaniesContext } from "./use-companies-context";

const newElement: CompanyFormFields = {
  countryCode: "es",
  name: "Good company",
  ticker: "GC",
  broker: "IN",
  closed: false,
  url: "",
  description: "Bla bla",
  currencyId: "1",
  dividendsCurrencyId: "1",
  marketId: "2",
  sectorId: "3",
  color: "#000",
  portfolioId: "1",
  alternativeTickers: ""
};

const mockExpectedReturnForGetId = {
  alternativeTickers: undefined,
  broker: undefined,
  closed: false,
  color: undefined,
  countryCode: "es",
  currencyAbbreviation: undefined,
  currencyId: undefined,
  currencyName: undefined,
  currencySymbol: undefined,
  description: "This is the description",
  dividends: {
    dividendsTransactions: []
  },
  dividendsCurrencyAbbreviation: undefined,
  dividendsCurrencyId: undefined,
  dividendsCurrencySymbol: undefined,
  dividendsTransactions: undefined,
  id: "1",
  investment: {
    rightsTransactions: [],
    sharesTransactions: []
  },
  marketId: undefined,
  name: "Good Company",
  portfolioCurrencyAbbreviation: undefined,
  portfolioCurrencySymbol: undefined,
  portfolioId: undefined,
  portfolioName: undefined,
  portfolioValue: {
    companyName: undefined,
    prices: {
      stockPrices: undefined
    },
    shares: {
      sharesTransactions: []
    }
  },
  prices: {
    stockPrices: []
  },
  returns: {
    closed: undefined,
    dividends: {
      dividendsTransactions: []
    },
    dividendsTransactions: [],
    investment: {
      rightsTransactions: [],
      sharesTransactions: []
    },
    portfolioValue: {
      companyName: undefined,
      prices: {
        stockPrices: []
      },
      shares: {
        sharesTransactions: []
      }
    },
    sharesTransactions: []
  },
  rightsTransactions: [],
  sectorId: undefined,
  sectorName: undefined,
  shares: {
    sharesTransactions: []
  },
  sharesTransactions: [],
  stockPrices: [],
  superSectorName: undefined,
  ticker: "GC",
  url: undefined
};

jest.mock("services/companies/companies-service", () => ({
  getAll: () => [],
  exportAll: () => [],
  getByTicker: () => ({}),
  getByTickerPortfolio: () => ({}),
  getById: () => (mockExpectedReturnForGetId),
  create: () => ({ changes: 1 }),
  getFirstTransaction: () => ({}),
  update: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 })
}));

describe("useCompaniesContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = SectorsService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  it("verifies that is loading is false when the component loads", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    expect(result.current.isLoading).toBe(false);
  });

  it("verifies that it loads empty", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    expect(result.current.companies.length).toBe(0);
  });

  it("verifies that it loads with no company", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    expect(result.current.company).toBe(null);
  });

  it("verifies that getAll returns the []", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    act(() => {
      expect(result.current.getAll("1")).toEqual([]);
    });
  });

  it("verifies that getById returns the company 1", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    act(() => {
      expect(result.current.getById("1")).toBe(mockExpectedReturnForGetId);
    });
  });

  it("verifies that the sector is set", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    act(() => {
      result.current.getById("1");
    });
    expect(result.current.company).toBe(mockExpectedReturnForGetId);
  });

  it("creates a company and returns changes", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    act(() => {
      expect(result.current.create(newElement)).toEqual({"changes": 1});
    });
  });

  it("updates a company and returns changes", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    act(() => {
      expect(result.current.update("1", newElement)).toEqual({"changes": 1});
    });
  });

  it("deletes a company and returns changes", () => {
    const { result } = renderHook(() => useCompaniesContext("1"));
    act(() => {
      expect(result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });
});
