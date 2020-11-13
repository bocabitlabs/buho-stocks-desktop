import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { ReactElement, useContext } from "react";
import { IsCollapsedContext } from "../../contexts/is-collapsed";
import SettingsService from "../../services/settings-service";

export default function SetCollapsedButton(): ReactElement {
  const { isCollapsed } = useContext(IsCollapsedContext);

  const changeIsCollapsed = () => {
    console.log("Changing is collapsed...");
    const result = new SettingsService().toggleCollapsed();
  };

  return (
    <Menu.Item className="trigger" onClick={changeIsCollapsed}>
      {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}{" "}
    </Menu.Item>
  );
}
