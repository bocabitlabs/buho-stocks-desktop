import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import CurrencyItem from "./CurrencyItem";

interface CurrencyListProps {
  uid: string;
}
/**
 * Display a list of currencies
 */
export default function CurrencyList({
  uid
}: CurrencyListProps): ReactElement | null {
  // const currenciesQuery = {
  //   collection: "currencies",
  //   limitTo: 10,
  //   equalTo: uid
  // };

  // Attach todos listener
  // useFirestoreConnect(() => [currenciesQuery]);

  // // Get todos from redux state
  // const currencies = useSelector(getCurrencies);

  // // // Show a message while todos are loading
  // if (!isLoaded(currencies)) {
  //   return <Spin />;
  // }

  // // Show a message if there are no todos
  // if (isEmpty(currencies)) {
  //   return <div>Currency list is empty</div>;
  // }

  return (
    <>
      {/* {currencies.map(({ id, ...currency }, index) => (
        <CurrencyItem key={`${id}-${index}`} id={id} {...currency} />
      ))} */}
    </>
  );

  // return null;
}
