import { renderHook, act } from "@testing-library/react-hooks";

import { useSharesTransactionsContext } from "./use-shares-transactions-context";

jest.mock(
  "services/shares-transactions/shares-transactions-service",
  () => ({
    getAll: () => [],
    getById: () => ({hello: "world"}),
    create: () => ({ changes: 1 }),
    deleteById: () => ({ changes: 1 }),
    update: () => ({ changes: 1 })
  })
);

describe("useDividendsTransactionsContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies the component initial values when it loads", () => {
    const { result } = renderHook(() => useSharesTransactionsContext("1"));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.sharesTransaction).toBe(null);
    expect(result.current.sharesTransactions).toEqual([]);
  });

  it("gets all the shares transactions", () => {
    const { result } = renderHook(() => useSharesTransactionsContext("1"));
    act(() => {
      expect(result.current.getAll()).toEqual([]);
    });
  });

  it("creates a shares transaction", () => {
    const { result } = renderHook(() => useSharesTransactionsContext("1"));
    act(() => {
      expect(
        result.current.create({
          count: 10,
          color: "#fff",
          commission: 1,
          companyId: "1",
          exchangeRate: 0.5,
          notes: "This is just a test",
          price: 10,
          transactionDate: "2021-05-06",
          type: "BUY"
        })
      ).toEqual({"changes": 1});
    });
  });

  it("updates a dividends transaction", () => {
    const { result } = renderHook(() => useSharesTransactionsContext("1"));
    act(() => {
      expect(
        result.current.update("1", {
          count: 10,
          color: "#fff",
          commission: 1,
          companyId: "1",
          exchangeRate: 0.5,
          notes: "This is just a test",
          price: 10,
          transactionDate: "2021-05-06",
          type: "BUY"
        })
      ).toEqual({"changes": 1});
    });
  });

  it("deletes a shares transaction", () => {
    const { result } = renderHook(() => useSharesTransactionsContext("1"));
    act(() => {
      expect(
        result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });

  it("gets a shares transaction", () => {
    const { result } = renderHook(() => useSharesTransactionsContext("1"));
    act(() => {
      expect(
        result.current.getById("1")).toEqual({hello: "world"});
    });
  });
});
