import React from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { getCurrencyById } from "../selectors/currency";

interface CurrencyItemProps {
  id: string;
}

/**
 *
 * @param id: The identifier of the the Currency
 */
function CurrencyItem({ id }: CurrencyItemProps) {
  const currency = useSelector(getCurrencyById)(id);
  const firestore = useFirestore();

  // function toggleDone() {
  //   firestore.update(`currencies/${id}`, { done: !currencies.done });
  // }

  function deleteCurrency() {
    return firestore.delete(`currencies/${id}`);
  }
  return (
    <li className="Todo">
      {currency.name}
      <button className="Todo-Button" onClick={deleteCurrency}>
        Delete
      </button>
    </li>
  );
}

export default CurrencyItem;
