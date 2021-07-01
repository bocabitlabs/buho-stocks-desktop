import { useQueryParameters } from "./use-query-parameters";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    search: "tab=shares&topic=api"
  })
}));

describe("useRightsTransactionsContext tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("verifies the component initial values when it loads", () => {
    const  result = useQueryParameters();
    expect(result.get("tab")).toEqual("shares");
    expect(result.get("topic")).toEqual("api");
  });

});