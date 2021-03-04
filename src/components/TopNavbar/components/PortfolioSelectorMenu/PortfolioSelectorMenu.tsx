import {
  FolderAddOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { IsCollapsedContext } from "contexts/is-collapsed";
import { SelectedPortfolioContext } from "contexts/selected-portfolio";
import React, { ReactElement, useContext } from "react";
import { useHistory } from "react-router-dom";
import PortfolioSelector from "../PortfolioSelector/PortfolioSelector";

export default function PortfolioSelectorMenu(): ReactElement {
  const history = useHistory();
  const { selectedPortfolio } = useContext(SelectedPortfolioContext);
  const { isCollapsed, toggleCollapsed } = useContext(IsCollapsedContext);

  const openPortfolio = () => {
    if (selectedPortfolio) {
      history.push(`/portfolios/${selectedPortfolio}`);
    }
  };

  const changeIsCollapsed = () => {
    // setIsCollapsed(!isCollapsed);
    toggleCollapsed();
  };

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
