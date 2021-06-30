import { renderHook, act } from "@testing-library/react-hooks";

import { useDividendsTransactionsContext } from "./use-dividends-transactions-context";

jest.mock(
  "services/dividends-transactions/dividends-transactions-service",
  () => ({
    // exportAll: () => returnAllExample,
    getAll: () => [],
    getById: () => ({hello: "world"}),
    // getByName: () => returnAllExample[2],
    create: () => ({ changes: 1 }),
    deleteById: () => ({ changes: 1 }),
    update: () => ({ changes: 1 })
  })
);

describe("useDividendsTransactionsContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = SectorsService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  it("verifies the component initial values when it loads", () => {
    const { result } = renderHook(() => useDividendsTransactionsContext("1"));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.dividendsTransaction).toBe(null);
    expect(result.current.dividendsTransactions).toEqual([]);
  });

  it("gets all the dividends transactions", () => {
    const { result } = renderHook(() => useDividendsTransactionsContext("1"));
    act(() => {
      expect(result.current.getAll()).toEqual([]);
    });
  });

  it("creates a dividends transaction", () => {
    const { result } = renderHook(() => useDividendsTransactionsContext("1"));
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
          transactionDate: "2021-05-06"
        })
      ).toEqual({"changes": 1});
    });
  });

  it("updates a dividends transaction", () => {
    const { result } = renderHook(() => useDividendsTransactionsContext("1"));
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
          transactionDate: "2021-05-06"
        })
      ).toEqual({"changes": 1});
    });
  });

  it("deletes a dividends transaction", () => {
    const { result } = renderHook(() => useDividendsTransactionsContext("1"));
    act(() => {
      expect(
        result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });

  it("gets a dividends transaction", () => {
    const { result } = renderHook(() => useDividendsTransactionsContext("1"));
    act(() => {
      expect(
        result.current.getById("1")).toEqual({hello: "world"});
    });
  });
});
