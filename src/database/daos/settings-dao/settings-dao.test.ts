import sendIpcSql from "message-control/renderer";
import SettingsDAO from "./settings-dao";

jest.mock("message-control/renderer");

const returnAllExample: any = {
  selectedPortfolio: "1",
  defaultCompanyDisplayMode: "card",
  collapsed: true
};

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Settings DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("get default company display mode", () => {
    const result = SettingsDAO.getDefaultCompanyDisplayMode();
    expect(result).toStrictEqual(returnAllExample.defaultCompanyDisplayMode);
  });

  test("get is collapsed", () => {
    const result = SettingsDAO.getIsCollapsed();
    expect(result).toStrictEqual(returnAllExample.collapsed);
  });

  test("get selected portfolio", () => {
    const result = SettingsDAO.getSelectedPortfolio();
    expect(result).toStrictEqual(returnAllExample.selectedPortfolio);
  });

  test("get settings", () => {
    const result = SettingsDAO.getSettings();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = SettingsDAO.addSettings({
      selectedPortfolio: "",
      collapsed: true,
      defaultCompanyDisplayMode: "",
      databasePath: "",
      language: "es"
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("set default company display mode", () => {
    const result = SettingsDAO.setDefaultCompanyDisplayMode("card");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("toggle collapsed", () => {
    const result = SettingsDAO.toggleCollapsed();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("Set database path", () => {
    const result = SettingsDAO.updateDatabasePath("/secur/path/to/db/backup");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("Set the language", () => {
    const result = SettingsDAO.updateLanguage("en");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("set selected portfolio", () => {
    const result = SettingsDAO.updateSelectedPortfolio("1");
    expect(result).toStrictEqual(returnAllExample);
  });
});
