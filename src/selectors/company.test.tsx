import { getCompanies, getCompanyById, getCompany } from "./company";

describe("company selectors tests", () => {
  const initialState = {
    firestore: {
      ordered: {
        companies: [
          {
            name: "Test Company",
            id: "abcdefg",
            userId: "12345",
            ticker: "TEST:COMP",
            notes: "These are the company notes",
            currency: "123456abdfgt",
            link: "https://company-link.test.bar.foo",
            market: "TestMKT"
          },
          {
            name: "Test Company 2",
            id: "abcdefgh",
            userId: "123456",
            ticker: "TEST:COMP2",
            notes: "These are the company notes 2",
            currency: "123456abdfgt",
            link: "https://company-link.test.bar.foo",
            market: "TestMKT"
          }
        ]
      },
      data: {
        companies: {
          abcdefg: {
            name: "Test Company",
            userId: "12345",
            id: "abcdefg",
            ticker: "TEST:COMP",
            notes: "These are the company notes",
            currency: "123456abdfgt",
            link: "https://company-link.test.bar.foo",
            market: "TestMKT"
          },
          abcdefgh: {
            name: "Test Company 2",
            id: "abcdefgh",
            userId: "123456",
            ticker: "TEST:COMP2",
            notes: "These are the company notes 2",
            currency: "123456abdfgt",
            link: "https://company-link.test.bar.foo",
            market: "TestMKT"
          }
        }
      }
    }
  };

  test("get a list of companies", () => {
    const companies = getCompanies(initialState);
    expect(companies).toHaveLength(2);
  });

  test("get a company by its id", () => {
    const company = getCompanyById(initialState)("abcdefg");
    expect(company.name).toBe("Test Company");
    expect(company.ticker).toBe("TEST:COMP");
  });

  test("get a company directly from the data", () => {
    let newInitialState = {
      firestore: {
        data: {
          abcdefg: {
            name: "Test Company",
            userId: "12345",
            id: "abcdefg",
            ticker: "TEST:COMP",
            notes: "These are the company notes",
            currency: "123456abdfgt",
            link: "https://company-link.test.bar.foo",
            market: "TestMKT"
          }
        }
      }
    };
    const company = getCompany(newInitialState)("abcdefg");
    expect(company.name).toBe("Test Company");
    expect(company.ticker).toBe("TEST:COMP");
  });
});
