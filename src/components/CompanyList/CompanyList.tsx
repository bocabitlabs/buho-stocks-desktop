import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Spin, PageHeader } from "antd";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { getCompanies } from "../../selectors/company";
import CompanyItem from "../CompanyListItem/CompanyListItem";
// import CurrencyItem from "./CurrencyItem";
// import { getCurrencies } from "../selectors/currency";

interface CompanyListProps {
  uid: string;
}
/**
 * Display a list of currencies
 */
export default function CompanyList({
  uid
}: CompanyListProps): ReactElement | null {
  // const currenciesQuery = {
  //   collection: "currencies",
  //   limitTo: 10,
  //   equalTo: uid
  // };

  useFirestoreConnect([
    {
      collection: "users",
      doc: uid,
      subcollections: [{ collection: "companies" }],
      storeAs: `companies`
    } // or 'todos'
  ]);

  // Attach todos listener
  // useFirestoreConnect(() => [currenciesQuery]);

  // // Get todos from redux state
  const companies = useSelector(getCompanies);

  // // Show a message while todos are loading
  if (!isLoaded(companies)) {
    return <div data-testid="company-spinner"><Spin /></div>;
  }

  // // Show a message if there are no todos
  if (isEmpty(companies)) {
    return <div>Company list is empty</div>;
  }

  return (
    <div data-testid="company-list">
      {companies.map(({ id, ...company }, index) => (
        <CompanyItem key={`${id}-${index}`} id={id} {...company} />
      ))}
    </div>
  );
}
