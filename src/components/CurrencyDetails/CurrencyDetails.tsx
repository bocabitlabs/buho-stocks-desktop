import React, { ReactElement } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { getCurrency } from "../../selectors/currency";

interface Props {
  id: string;
  uid: string;
}

export default function CurrencyDetails({
  id,
  uid
}: Props): ReactElement | null {
  useFirestoreConnect([
    {
      collection: `users/${uid}/currencies`,
      doc: id,
      storeAs: id
    }
  ]);

  const currency = useSelector(getCurrency)(id);

  if (currency) {
    return <div>{currency.name} ({currency.symbol})</div>;
  }

  return <div>No currency</div>;
}
