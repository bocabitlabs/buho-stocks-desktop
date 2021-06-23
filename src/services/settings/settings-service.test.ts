import { ISettings } from "types/settings";
import Service from "./settings-service";

const returnAllExample: ISettings = {
  selectedPortfolio: "1",
  collapsed: true,
  defaultCompanyDisplayMode: "card",
  databasePath: "",
  language: "en"
};
jest.mock("database/daos/settings-dao/settings-dao", () => ({
  getSettings: () => returnAllExample,
  getIsCollapsed: () => returnAllExample.collapsed,
  getSelectedPortfolio: () => returnAllExample.selectedPortfolio,
  getDefaultCompanyDisplayMode: () =>
    returnAllExample.defaultCompanyDisplayMode,
  addSettings: () => ({ changes: 1 }),
  updateLanguage: () => ({ changes: 1 }),
  updateDatabasePath: () => ({ changes: 1 }),
  updateSelectedPortfolio: () => ({ changes: 1 }),
  toggleCollapsed: () => ({ changes: 1 }),
  setDefaultCompanyDisplayMode: () => ({ changes: 1 })
}));

describe("SettingsService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getSettings return all results", () => {
    const result = Service.getSettings();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("getIsCollapsed return collapsed", () => {
    const result = Service.getIsCollapsed();
    expect(result).toStrictEqual(returnAllExample.collapsed);
  });

  test("getSelectedPortfolio return collapsed", () => {
    const result = Service.getSelectedPortfolio();
    expect(result).toStrictEqual(returnAllExample.selectedPortfolio);
  });

  test("addSettings", () => {
    const newElement: ISettings = {
      selectedPortfolio: "1",
      collapsed: true,
      defaultCompanyDisplayMode: "card",
      databasePath: "",
      language: "en"
    };

    const result = Service.addSettings(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update selected portfolio", () => {
    const result = Service.updateSelectedPortfolio("2");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update database path", () => {
    const result = Service.updateDatabasePath("/foo/bar");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("toggle collapsed", () => {
    const result = Service.toggleCollapsed();
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("set default company display mode", () => {
    const result = Service.setDefaultCompanyDisplayMode("card");
    expect(result).toStrictEqual({ changes: 1 });
  });
});
