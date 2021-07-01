import { renderHook, act } from "@testing-library/react-hooks";

import { useRightsTransactionsContext } from "./use-rights-transactions-context";

jest.mock(
  "services/rights-transactions/rights-transactions-service",
  () => ({
    getAll: () => [],
    getById: () => ({hello: "world"}),
    create: () => ({ changes: 1 }),
    deleteById: () => ({ changes: 1 }),
    update: () => ({ changes: 1 })
  })
);

describe("useRightsTransactionsContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies the component initial values when it loads", () => {
    const { result } = renderHook(() => useRightsTransactionsContext("1"));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.rightsTransaction).toBe(null);
    expect(result.current.rightsTransactions).toEqual([]);
  });

  it("gets all the rights transactions", () => {
    const { result } = renderHook(() => useRightsTransactionsContext("1"));
    act(() => {
      expect(result.current.getAll()).toEqual([]);
    });
  });

  it("creates a rights transaction", () => {
    const { result } = renderHook(() => useRightsTransactionsContext("1"));
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

  it("updates a rights transaction", () => {
    const { result } = renderHook(() => useRightsTransactionsContext("1"));
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

  it("deletes a rights transaction", () => {
    const { result } = renderHook(() => useRightsTransactionsContext("1"));
    act(() => {
      expect(
        result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });

  it("gets a rights transaction", () => {
    const { result } = renderHook(() => useRightsTransactionsContext("1"));
    act(() => {
      expect(
        result.current.getById("1")).toEqual({hello: "world"});
    });
  });
});
