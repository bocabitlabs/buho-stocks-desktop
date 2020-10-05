import React, { ReactElement } from "react";
// import { Spin } from "antd";
// import CompanyItem from "../CompanyItem";
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

  // Attach todos listener
  // useFirestoreConnect(() => [currenciesQuery]);

  // // Get todos from redux state
  // const companies = useSelector(getCompanies);

  // // Show a message while todos are loading
  // if (!isLoaded(companies)) {
  //   return <Spin />;
  // }

  // // // Show a message if there are no todos
  // if (isEmpty(companies)) {
  //   return <div>Company list is empty</div>;
  // }

  return (
    <>
      {/* {companies.map(({ id, ...company }, index) => (
        <CompanyItem key={`${id}-${index}`} id={id} {...company} />
      ))} */}
    </>
  );
}
