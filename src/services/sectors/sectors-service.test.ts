import { ISector, SectorFormFields } from "types/sector";
import SectorsService from "./sectors-service";

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

jest.mock("database/daos/sectors/sectors-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[2],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("SectorsService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = SectorsService.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id", () => {
    const result = SectorsService.getById("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("get by name", () => {
    const result = SectorsService.getByName("2");
    expect(result).toStrictEqual(returnAllExample[2]);
  });

    test("delete by id", () => {
    const result = SectorsService.deleteById("1");
    expect(result).toStrictEqual({changes: 1});
  });

  test("export all", () => {
    const result = SectorsService.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("create", () => {
    const newElement: SectorFormFields = {
      name: "name",
      color: "color",
      isSuperSector: false
    };

    const result = SectorsService.create(newElement);
    expect(result).toStrictEqual({changes: 1});
  });

  test("update", () => {
    const newElement: SectorFormFields = {
      name: "name",
      color: "color",
      isSuperSector: false
    };

    const result = SectorsService.update("1", newElement);
    expect(result).toStrictEqual({changes: 1});
  });
});
