import { renderHook, act } from "@testing-library/react-hooks";

import { useExchangeRatesContext } from "./use-exchange-rates-context";

jest.mock(
  "services/exchange-rates/exchange-rates-service",
  () => ({
    getAll: () => [],
    get: () => ({hello: "world"}),
    create: () => ({ changes: 1 }),
  })
);

describe("useExchangeRatesContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies the component initial values when it loads", () => {
    const { result } = renderHook(() => useExchangeRatesContext());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.exchangeRate).toBe(null);
    expect(result.current.exchangeRates).toEqual([]);
  });

  it("gets all the exchange rates", () => {
    const { result } = renderHook(() => useExchangeRatesContext());
    act(() => {
      expect(result.current.getAll()).toEqual([]);
    });
  });

  it("gets a rights transaction", () => {
    const { result } = renderHook(() => useExchangeRatesContext());
    act(() => {
      expect(
        result.current.get("2020-01-19", "EURUSD")).toEqual({hello: "world"});
    });
  });

  it("creates a exchange rate", () => {
    const { result } = renderHook(() => useExchangeRatesContext());
    act(() => {
      expect(
        result.current.create({
          transactionDate: "2021-05-06",
          exchangeName: "EURUSD",
          exchangeValue: 0.5
        })
      ).toEqual({"changes": 1});
    });
  });
});