import React from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { getCurrencyById } from "../../selectors/currency";
import { getFirebaseAuth } from "../../selectors/profile";

interface CurrencyItemProps {
  id: string;
}

/**
 *
 * @param id: The identifier of the the Currency
 */
function CurrencyListItem({ id }: CurrencyItemProps) {
  const currency = useSelector(getCurrencyById)(id);
  const firestore = useFirestore();
  const { uid }: any = useSelector(getFirebaseAuth);

  function deleteCurrency() {
    return firestore.delete(`users/${uid}/currencies/${id}`);
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

export default CurrencyListItem;
