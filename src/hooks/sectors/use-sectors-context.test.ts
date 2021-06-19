import { renderHook, act } from "@testing-library/react-hooks";

import { ISector, SectorFormFields } from "types/sector";
import { useSectorsContext } from "./use-sectors-context";

const returnAllExample: ISector[] = [
  {
    id: "1",
    name: "name1",
    color: "color1",
    isSuperSector: false,
    superSectorName: "Super"
  },
  {
    id: "2",
    name: "name2",
    color: "color2",
    isSuperSector: false,
    superSectorName: "Super"
  },
  {
    id: "3",
    name: "name3",
    color: "color3",
    isSuperSector: true,
    superSectorName: ""
  }
];

jest.mock("services/sectors/sectors-service", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[2],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("useSectorsContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = SectorsService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  it("verifies that is loading is false when the component loads", () => {
    const { result } = renderHook(() => useSectorsContext());
    expect(result.current.isLoading).toBe(false);
  });

  it("verifies that it loads with 3 sectors", () => {
    const { result } = renderHook(() => useSectorsContext());
    expect(result.current.sectors.length).toBe(3);
  });

  it("verifies that it loads with no sector", () => {
    const { result } = renderHook(() => useSectorsContext());
    expect(result.current.sector).toBe(null);
  });

  it("verifies that fetchSectors returns the sector", () => {
    const { result } = renderHook(() => useSectorsContext());
    act(() => {
      expect(result.current.fetchSectors()).toBe(returnAllExample);
    });
  });

  it("verifies that getById returns the sector 1", () => {
    const { result } = renderHook(() => useSectorsContext());
    act(() => {
      expect(result.current.getById("1")).toBe(returnAllExample[1]);
    });
  });

  it("verifies that the sector is set", () => {
    const { result } = renderHook(() => useSectorsContext());
    act(() => {
      result.current.getById("1");
    });
    expect(result.current.sector).toBe(returnAllExample[1]);
  });

  it("creates a sector and returns changes", () => {
    const { result } = renderHook(() => useSectorsContext());
    act(() => {
      expect(result.current.create(returnAllExample[1])).toEqual({"changes": 1});
    });
  });

  it("updates a sector and returns changes", () => {
    const { result } = renderHook(() => useSectorsContext());
    act(() => {
      expect(result.current.update("1", returnAllExample[1])).toEqual({"changes": 1});
    });
  });
});
