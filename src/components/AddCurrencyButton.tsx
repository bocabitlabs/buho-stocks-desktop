import React, { ReactElement } from "react";
import { Button } from "antd";
import { getFirebaseAuth } from "../selectors/profile";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";

/**
 * Add a new Currency
 */
function AddCurrencyButton(): ReactElement {
  const firestore = useFirestore();
  const { uid }: any = useSelector(getFirebaseAuth);

  const addCurrencyAction = () => {
    console.log("Called addCurrencyAction");
    const currency = { name: "PEPO", abreviation: "POP", userId: uid };
    console.log(uid);
    firestore
      .collection("users")
      .doc(uid)
      .collection("currencies")
      .add(currency);
  };

  return (
    <Button type="primary" onClick={addCurrencyAction}>
      Add new Currency
    </Button>
  );
}

export default AddCurrencyButton;
