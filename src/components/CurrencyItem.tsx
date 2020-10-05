import React from "react";

interface CurrencyItemProps {
  id: string;
}

/**
 *
 * @param id: The identifier of the the Currency
 */
function CurrencyItem({ id }: CurrencyItemProps) {
  // const currency = useSelector(getCurrencyById)(id);
  // const { uid }: any = useSelector(getFirebaseAuth);

  // function toggleDone() {
  //   firestore.update(`currencies/${id}`, { done: !currencies.done });
  // }

  function deleteCurrency() {
    // Delete
    // return firestore.delete(`users/${uid}/currencies/${id}`);
  }
  return (
    <li className="Todo">
      {/* {currency.name} */}
      <button className="Todo-Button" onClick={deleteCurrency}>
        Delete
      </button>
    </li>
  );
}

export default CurrencyItem;
