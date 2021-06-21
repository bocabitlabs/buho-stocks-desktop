import { renderHook, act } from "@testing-library/react-hooks";
import { IMarket } from "types/market";

import { useMarketsContext } from "./use-markets-context";

const returnAllExample: IMarket[] = [
  {
    id: "1",
    name: "NYSE",
    color: "color1",
    region: "USA",
    openTime: "14:00",
    closeTime: "20:00",
    description: "description"
  },
  {
    id: "2",
    name: "NASDAQ",
    color: "color1",
    region: "USA",
    openTime: "14:00",
    closeTime: "20:00",
    description: "description"
  },
];

jest.mock("services/markets/markets-service", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[2],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("useMarketsContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = SectorsService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  it("verifies that is loading is false when the component loads", () => {
    const { result } = renderHook(() => useMarketsContext());
    expect(result.current.isLoading).toBe(false);
  });

  it("verifies that it loads with 2 markets", () => {
    const { result } = renderHook(() => useMarketsContext());
    expect(result.current.markets.length).toBe(2);
  });

  it("verifies that it loads with no market", () => {
    const { result } = renderHook(() => useMarketsContext());
    expect(result.current.market).toBe(null);
  });

  it("verifies that getAll returns the market", () => {
    const { result } = renderHook(() => useMarketsContext());
    act(() => {
      expect(result.current.getAll()).toBe(returnAllExample);
    });
  });

  it("verifies that getById returns the market 1", () => {
    const { result } = renderHook(() => useMarketsContext());
    act(() => {
      expect(result.current.getById("1")).toBe(returnAllExample[1]);
    });
  });

  it("verifies that the market is set", () => {
    const { result } = renderHook(() => useMarketsContext());
    act(() => {
      result.current.getById("1");
    });
    expect(result.current.market).toBe(returnAllExample[1]);
  });

  it("creates a market and returns changes", () => {
    const { result } = renderHook(() => useMarketsContext());
    act(() => {
      expect(result.current.create(returnAllExample[1])).toEqual({"changes": 1});
    });
  });

  it("updates a market and returns changes", () => {
    const { result } = renderHook(() => useMarketsContext());
    act(() => {
      expect(result.current.update("1", returnAllExample[1])).toEqual({"changes": 1});
    });
  });

  it("deletes a market and returns changes", () => {
    const { result } = renderHook(() => useMarketsContext());
    act(() => {
      expect(result.current.deleteById("1")).toEqual({"changes": 1});
    });
  });
});
