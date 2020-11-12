import { createContext } from "react";
import { CompanyFields } from "../types/company";

export type CompanyContextType = {
  company: CompanyFields | null;
};

export const companiesDefaultValue: CompanyContextType = {
  company: null
};

export const CompanyContext = createContext<CompanyContextType>(
  companiesDefaultValue
);
