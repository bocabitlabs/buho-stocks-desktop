import { renderHook, act } from "@testing-library/react-hooks";
import { ISettings } from "types/settings";

import { useIsCollapsedContext } from "./use-is-collapsed-context";

const returnAllExample: ISettings = {
  selectedPortfolio: "1",
  collapsed: true,
  defaultCompanyDisplayMode: "card",
  databasePath: "",
  language: "en"
};

jest.mock("services/settings/settings-service", () => ({
  getIsCollapsed: () => returnAllExample.collapsed,
  toggleCollapsed: () => ({ changes: 1 })
}));

describe("useCurrenciesContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies that is collapsed is false when the component loads", () => {
    const { result } = renderHook(() => useIsCollapsedContext());
    expect(result.current.isCollapsed).toBe(true);
  });

  it("verifies that isCollapsed can be set", () => {
    const { result } = renderHook(() => useIsCollapsedContext());
    act(() => {
      result.current.toggleCollapsed()
    });
    expect(result.current.isCollapsed).toBe(true);
  });

});
