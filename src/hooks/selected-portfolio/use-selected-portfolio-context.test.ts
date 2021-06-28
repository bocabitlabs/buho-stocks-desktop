import { renderHook, act } from "@testing-library/react-hooks";
import { ISettings } from "types/settings";

import { useSelectedPortfolioContext } from "./use-selected-portfolio-context";

const returnAllExample: ISettings = {
  selectedPortfolio: "1",
  collapsed: true,
  defaultCompanyDisplayMode: "card",
  databasePath: "",
  language: "en"
};

jest.mock("services/settings/settings-service", () => ({
  getIsCollapsed: () => returnAllExample.collapsed,
  toggleCollapsed: () => ({ changes: 1 }),
  getSelectedPortfolio: () => null,
  updateSelectedPortfolio: () => ({ changes: 1 })
}));

describe("useSelectedPortfolioContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies that selected portfolio is null when the component loads", () => {
    const { result } = renderHook(() => useSelectedPortfolioContext());
    expect(result.current.selectedPortfolio).toBe(null);
  });

  it("verifies that isCollapsed can be set", () => {
    const { result } = renderHook(() => useSelectedPortfolioContext());
    act(() => {
      result.current.update("1")
    });
    expect(result.current.selectedPortfolio).toBe(null);
  });

});
