import React from "react";
import { useSelector } from "react-redux";
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

  // function toggleDone() {
  //   firestore.update(`currencies/${id}`, { done: !currencies.done });
  // }

  function deleteCompany() {
    // delete
    // return firestore.delete(`users/${uid}/companies/${id}`);
  }
  return (
    <li className="Todo">
      {/* {company.name} */}
      <button className="Todo-Button" onClick={deleteCompany}>
        Delete
      </button>
    </li>
  );
}

export default CompanyItem;
