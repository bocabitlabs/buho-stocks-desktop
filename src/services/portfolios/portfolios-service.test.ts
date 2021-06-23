import Service from "./portfolios-service";
import { PortfolioFormFields } from "types/portfolio";
import PortfolioDAO from "database/daos/portfolio-dao/portfolio-dao";
import CompanyDAO from "database/daos/company-dao/company-dao";

const mockExpectedReturnForGetId = {
  color: "#fff",
  companies: [],
  currencyAbbreviation: "USD",
  currencyCountryCode: "us",
  currencyId: 1,
  currencyName: "US Dolar",
  currencySymbol: "$",
  description: "This is description",
  name: "Portfolio Default",
  id: "1"
};

const mockCompany = { name: "Company 1", ticker: "IBM" };

jest.mock("database/daos/portfolio-dao/portfolio-dao", () => ({
  getAll: () => [],
  exportAll: () => [],
  getByName: () => ({}),
  getById: () => mockExpectedReturnForGetId,
  create: () => ({ changes: 1 }),
  getFirstTransaction: () => ({}),
  update: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 })
}));

jest.mock("database/daos/company-dao/company-dao", () => ({
  getAll: () => [mockCompany],
  getById: () => mockCompany,
  update: () => ({ changes: 1 })
}));

jest.mock("yahoo-stock-prices-fetch", () => ({
  getCurrentData: () => jest.fn(),
  getHistoricalPrices: async () => [1, 2, 3]
}));

describe("PortfolioService tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll return all results empty", () => {
    const result = Service.getAll();
    expect(result).toStrictEqual([]);
  });

  test("getAll return undefined results", () => {
    const mockAddListener = jest.spyOn(PortfolioDAO, "getAll");
    mockAddListener.mockImplementation(() => {
      return undefined;
    });
    const result = Service.getAll();
    expect(result).toStrictEqual([]);
  });

  // test("getAll return null", () => {
  //   const mockAddListener = jest.spyOn(PortfolioDAO, "getAll");
  //   const mockGetById = jest.spyOn(Service, "getById");

  //   mockAddListener.mockImplementation(() => {
  //     return [1,2,3];
  //   });

  //   mockGetById.mockImplementation(() => {
  //     return null;
  //   });
  //   const result = Service.getAll();
  //   expect(result).toStrictEqual([]);
  // });

  test("exportAll return all results", () => {
    const result = Service.exportAll();
    expect(result).toStrictEqual([]);
  });

  test("getByName return", () => {
    const result = Service.getByName("Portfolio test");
    expect(result).toStrictEqual({});
  });

  test("getById return", () => {
    const mockGetById = jest.spyOn(PortfolioDAO, "getById");
    mockGetById.mockImplementation(() => {
      return mockExpectedReturnForGetId;
    });
    const mockGetByIdCompany = jest.spyOn(CompanyDAO, "getAll");
    mockGetByIdCompany.mockImplementation(() => {
      return [mockCompany];
    });

    const result = Service.getById("1");
    expect(result?.color).toStrictEqual(mockExpectedReturnForGetId.color);
    expect(result?.name).toStrictEqual(mockExpectedReturnForGetId.name);
    expect(result?.description).toStrictEqual(
      mockExpectedReturnForGetId.description
    );
    expect(result?.companies.length).toStrictEqual(1);
  });

  // test("get by id undefined", () => {
  //   console.log("get undefined")
  //   const mockGetById = jest.spyOn(PortfolioDAO, "getById");
  //   mockGetById.mockImplementation(() => {
  //     console.log("Called mockGetById");
  //     return mockExpectedReturnForGetId;
  //   });
  //   const mockGetByIdCompany = jest.spyOn(CompanyDAO, "getAll");
  //   mockGetByIdCompany.mockImplementation(() => {
  //     console.log("Call mock com panyById")
  //     return ([mockCompany]);
  //   });

  //   const result = Service.getById("1");
  //   console.log(result)
  //   expect(result).toStrictEqual(null);
  // });

  test("delete by ID", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update selected portfolio", () => {
    const newElement: PortfolioFormFields = {
      name: "Good company",
      description: "This is description",
      color: "#000",
      currencyId: 1
    };
    const result = Service.update("2", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("getFirstTransaction return", () => {
    const result = Service.getFirstTransaction("1");
    expect(result).toStrictEqual({});
  });

  test("create", () => {
    const newElement: PortfolioFormFields = {
      name: "Good company",
      description: "This is description",
      color: "#000",
      currencyId: 1
    };

    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });
});
