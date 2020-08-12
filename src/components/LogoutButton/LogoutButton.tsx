import React, { ReactElement } from "react";
import { Button } from "antd";
import { useFirebase } from "react-redux-firebase";

function LogoutButton(): ReactElement {
  const firebase = useFirebase();

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
    <Button type={"primary"} onClick={handleLogout}>
      Sign out
    </Button>
  );
}

export default LogoutButton;
