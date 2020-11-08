import {
  FolderAddOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SettingsContext } from "../../contexts/settings";
import PortfolioSelector from "../PortfolioSelector/PortfolioSelector";

interface AppSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: Function;
}

export default function PortfolioSelectorMenu({
  isCollapsed,
  setIsCollapsed
}: AppSidebarProps): ReactElement {
  const history = useHistory();

  const { settings, fetchSettings } = useContext(
    SettingsContext
  );

  const openPortfolio = () => {
    history.push(`/portfolios/${settings?.selectedPortfolio}`);
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const changeIsCollapsed = () => {
    console.log("Changing is collapsed...")
    setIsCollapsed(!isCollapsed);
    // toggleCollapsed()
  }
  console.log(settings)
  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
      <Menu.Item className="trigger" onClick={changeIsCollapsed}>
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Menu.Item>
      <PortfolioSelector />
      <Menu.Item
        title="Open the selected portfolio"
        onClick={openPortfolio}
        key="open-portfolio"
        icon={<FolderOpenOutlined />}
      >
        Open portfolio
      </Menu.Item>
      <Menu.Item
        title="Add a portfolio"
        onClick={() => history.push(`/add/portfolio/`)}
        key="add-portfolio"
        icon={<FolderAddOutlined />}
      />
    </Menu>
  );
}
