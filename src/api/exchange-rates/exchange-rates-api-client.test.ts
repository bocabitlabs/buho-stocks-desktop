import ExchangeRatesAPIClient from "./exchange-rates-api-client";


jest.mock("yahoo-stock-prices-fetch", () => ({
  getCurrentData: () => jest.fn(),
  getHistoricalPrices: async () => [1, 2, 3]
}));


describe("ExchangeRatesAPIClient tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("get stock price from API", async () => {
    const result = await ExchangeRatesAPIClient.getHistoricalPrice("01-02-2020", "USDEUR");
    expect(result).toStrictEqual(1);
  });

  test("get historic stock price from API with start and end", async () => {
    const result = await ExchangeRatesAPIClient.getHistoricalPriceWeekly(
      "01-01-2019",
      "01-02-2019",
      "USDEUR"
    );
    expect(result).toStrictEqual(1);
  });
});