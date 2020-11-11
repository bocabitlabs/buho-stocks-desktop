import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { IsCollapsedContext } from "../../contexts/settings";

export default function SetCollapsedButton(): ReactElement {
  const { isCollapsed, toggleCollapsed, fetchIsCollapsed } = useContext(IsCollapsedContext);

  const changeIsCollapsed = () => {
    console.log("Changing is collapsed...");
    const result = toggleCollapsed();
    if(result === 'OK'){
      fetchIsCollapsed()
    }
  };

  useEffect(() => {
    fetchIsCollapsed()
  }, [fetchIsCollapsed])

  return (
    <Menu.Item className="trigger" onClick={changeIsCollapsed}>
      {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}{" "}
      {JSON.stringify(isCollapsed)}
    </Menu.Item>
  );
}
