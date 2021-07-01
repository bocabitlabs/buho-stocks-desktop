import { renderHook, act } from "@testing-library/react-hooks";
import { ISettings } from "types/settings";

import { useSettingsContext } from "./use-settings-context";

const returnAllExample: ISettings = {
  selectedPortfolio: "1",
  collapsed: true,
  defaultCompanyDisplayMode: "card",
  databasePath: "",
  language: "en"
};

jest.mock("services/settings/settings-service", () => ({
  getIsCollapsed: () => returnAllExample.collapsed,
  getSettings: () => (returnAllExample),
  setDefaultCompanyDisplayMode: () => returnAllExample.defaultCompanyDisplayMode,
  updateDatabasePath: () => returnAllExample.databasePath,
  updateLanguage: () => returnAllExample.language,
  toggleCollapsed: () => ({ changes: 1 })
}));

describe("useCurrenciesContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies that is collapsed is false when the component loads", () => {
    const { result } = renderHook(() => useSettingsContext());
    expect(result.current.settings).toBe(returnAllExample);
  });

  it("sets the default display mode", () => {
    const { result } = renderHook(() => useSettingsContext());
    act(() => {
      result.current.setDefaultCompanyDisplayMode("table")
    });
  });

  it("sets the database path", () => {
    const { result } = renderHook(() => useSettingsContext());
    act(() => {
      result.current.updateDatabasePath("/")
    });
  });

  it("verifies that isCollapsed can be set", () => {
    const { result } = renderHook(() => useSettingsContext());
    act(() => {
      result.current.toggleCollapsed()
    });
    expect(result.current.settings?.collapsed).toBe(true);
  });

});
