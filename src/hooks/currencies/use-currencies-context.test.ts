import { renderHook, act } from "@testing-library/react-hooks";
import { ICurrency } from "types/currency";

import { useCurrenciesContext } from "./use-currencies-context";

const returnAllExample: ICurrency[] = [
  {
    id: "1",
    name: "US Dolar",
    color: "color1",
    abbreviation: "USD",
    symbol: "$",
    country: "USA"
  },
  {
    id: "2",
    name: "Euro",
    color: "color1",
    abbreviation: "EUR",
    symbol: "€",
    country: "European Union"
  }
];

jest.mock("services/currencies/currencies-service", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[2],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("useCurrenciesContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = SectorsService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  it("verifies that is loading is false when the component loads", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    expect(result.current.isLoading).toBe(false);
  });

  it("verifies that it loads with 2 currencies", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    expect(result.current.currencies.length).toBe(2);
  });

  it("verifies that it loads with no currency", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    expect(result.current.currency).toBe(null);
  });

  it("verifies that getAll returns the currency", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    act(() => {
      expect(result.current.getAll()).toBe(returnAllExample);
    });
  });

  it("verifies that getById returns the currency 1", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    act(() => {
      expect(result.current.getById("1")).toBe(returnAllExample[1]);
    });
  });

  it("verifies that the currency is set", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    act(() => {
      result.current.getById("1");
    });
    expect(result.current.currency).toBe(returnAllExample[1]);
  });

  it("creates a sector and returns changes", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    act(() => {
      expect(result.current.create(returnAllExample[1])).toEqual({"changes": 1});
    });
  });

  it("updates a currency and returns changes", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    act(() => {
      expect(result.current.update("1", returnAllExample[1])).toEqual({"changes": 1});
    });
  });

  it("deletes a sector and returns changes", () => {
    const { result } = renderHook(() => useCurrenciesContext());
    act(() => {
      expect(result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });
});
