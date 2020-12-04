import { mocked } from "ts-jest/utils";
import helpers from "./inflation-service";

// const mockedMethod = jest.fn();

// jest.mock("./inflation-service");

// const mMock = jest.fn();
// InflationService.mockImplementation(() => {
//   return {
//     getInflationsForYear: mMock,
//   };
// });

// const foo = require('../foo');

// // foo is a mock function
// foo.mockImplementation(() => 42);
// foo();

describe("InflationService tests", () => {
  test("return empty results", () => {
    helpers.add = jest.fn();
    helpers.getInflationsForYear = jest.fn();
    expect(helpers.add.mock).toBeTruthy();
    expect(helpers.getInflationsForYear.mock).toBeTruthy();

  });
});
