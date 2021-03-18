import {
  FolderAddOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { SelectedPortfolioContext } from "contexts/selected-portfolio";
import { SettingsContext } from "contexts/settings";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PortfolioSelector from "../PortfolioSelector/PortfolioSelector";

export default function PortfolioSelectorMenu(): ReactElement {
  const history = useHistory();
  const { selectedPortfolio } = useContext(SelectedPortfolioContext);
  const { toggleCollapsed,  } = useContext(SettingsContext);
  const { settings } = useContext(SettingsContext);
  const [isCollapsed, setIsCollapsed] = useState(false)

  const openPortfolio = () => {
    if (selectedPortfolio) {
      history.push(`/portfolios/${selectedPortfolio}`);
    }
  };

  const changeIsCollapsed = () => {
    // setIsCollapsed(!isCollapsed);
    console.log("Changing collapsed")
    toggleCollapsed();
  };

  useEffect(() => {
    if(settings !== null){
      const { collapsed } = settings;
      setIsCollapsed(collapsed);
    }
  }, [settings]);

  return (
    <Menu theme="light" mode="horizontal">
      <Menu.Item className="trigger" onClick={changeIsCollapsed}>
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Menu.Item>

      <PortfolioSelector />
      <Menu.Item
        title="Open the selected portfolio"
        key="open-portfolio"
        onClick={openPortfolio}
        disabled={selectedPortfolio === "" ? true : false}
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
