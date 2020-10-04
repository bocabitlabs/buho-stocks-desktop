import React, { ReactElement } from "react";
import { Button } from "antd";

function LogoutButton(): ReactElement {
  const handleLogout = () => {
    console.log("Callling logout");
  };

  return (
    <Button type={"primary"} onClick={handleLogout}>
      Sign out
    </Button>
  );
}

export default LogoutButton;
