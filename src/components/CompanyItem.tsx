import React from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { getFirebaseAuth } from "../selectors/profile";
import { getCompanyById } from "../selectors/company";

interface CompanyItemProps {
  id: string;
}

/**
 *
 * @param id: The identifier of the the Currency
 */
function CompanyItem({ id }: CompanyItemProps) {
  const company = useSelector(getCompanyById)(id);
  const firestore = useFirestore();
  const { uid }: any = useSelector(getFirebaseAuth);

  // function toggleDone() {
  //   firestore.update(`currencies/${id}`, { done: !currencies.done });
  // }

  function deleteCompany() {
    return firestore.delete(`users/${uid}/companies/${id}`);
  }
  return (
    <li className="Todo">
      {company.name}
      <button className="Todo-Button" onClick={deleteCompany}>
        Delete
      </button>
    </li>
  );
}

export default CompanyItem;
