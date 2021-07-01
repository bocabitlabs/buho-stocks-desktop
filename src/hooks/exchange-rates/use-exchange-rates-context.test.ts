import { renderHook, act } from "@testing-library/react-hooks";

import { useExchangeRatesContext } from "./use-exchange-rates-context";

jest.mock(
  "services/exchange-rates/exchange-rates-service",
  () => ({
    getAll: () => [],
    get: () => ({hello: "world"}),
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

  it("gets a exchangeRate", () => {
    const { result } = renderHook(() => useExchangeRatesContext());
    act(() => {
      expect(
        result.current.get("2020-01-19", "EURUSD")).toEqual({hello: "world"});
    });
  });
});