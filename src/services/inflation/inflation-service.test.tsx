import { Inflation, InflationFormFields } from "types/inflation";
import InflationService from "./inflation-service";

const returnAllExample: Inflation[] = [
  { id: "1", year: 2019, percentage: 5 },
  { id: "2", year: 2020, percentage: 2 },
  { id: "3", year: 2021, percentage: 4 }
];

jest.mock("database/daos/inflation-dao", () => ({
  getAll: () => returnAllExample,
  getInflationsForYear: () => returnAllExample,
  addInflation: () => ({changes: 1}),
  deleteById: () => ({changes: 1})
}));

describe("InflationService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test("getAll return all results", () => {
  //   const result = InflationService.getAll();
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  // test("get inflations for year", () => {
  //   const result = InflationService.getInflationsForYear(2019);
  //   expect(result).toStrictEqual(returnAllExample);
  // });

  // test("add inflation", () => {
  //   const inflationToAdd: InflationFormFields = {
  //     year: 2017,
  //     percentage: 5
  //   };

  //   const result = InflationService.add(inflationToAdd);
  //   expect(result).toStrictEqual({changes: 1});
  // });

  // test("delete inflation", () => {
  //   const result = InflationService.deleteById("1");
  //   expect(result).toStrictEqual({changes: 1});
  // });
});
