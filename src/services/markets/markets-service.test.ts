import { IMarket, MarketFormProps } from "types/market";
import Service from "./markets-service";

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

jest.mock("database/daos/market-dao/market-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[1],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("CurrencyService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = Service.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id", () => {
    const result = Service.getById("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("get by name", () => {
    const result = Service.getByName("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("delete by id", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("export all", () => {
    const result = Service.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("create", () => {
    const newElement: MarketFormProps = {
      name: "NASDAQ",
      color: "color1",
      region: "USA",
      openTime: "14:00",
      closeTime: "20:00",
      description: "description"
    };

    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update", () => {
    const newElement: MarketFormProps = {
        name: "NASDAQ",
        color: "color1",
        region: "USA",
        openTime: "14:00",
        closeTime: "20:00",
        description: "description"
    };

    const result = Service.update("1", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });
});
