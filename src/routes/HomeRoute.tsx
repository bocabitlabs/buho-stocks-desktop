import React from "react";

import {
  ExampleComponent,
  ExampleComponentWithType
} from "../components/ExampleComponent";
import AddCurrencyButton from "../components/AddCurrencyButton";
import CurrencyList from "../components/CurrencyList";
import { Button } from "antd";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { getFirebaseAuth } from "../selectors/profile";

const Home = () => {
  const firebase = useFirebase();
  const { uid }: any = useSelector(getFirebaseAuth);

  const handleLogout = () => {
    console.log("Callling logout");
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Home</h1>
      <div>
        Edit <code>src/App.tsx</code> and save to reload.
        <ExampleComponent who={"me"} />
        <ExampleComponentWithType who={"me2"} />
        <AddCurrencyButton />
        <CurrencyList uid={uid} />
      </div>
      <Button type={"primary"} onClick={handleLogout}>
        Sign out
      </Button>
    </>
  );
};

export default Home;
