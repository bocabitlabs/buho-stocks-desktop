import React from "react";

interface CompanyItemProps {
  id: string;
}

/**
 *
 * @param id: The identifier of the the Currency
 */
function CompanyItem({ id }: CompanyItemProps) {

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
