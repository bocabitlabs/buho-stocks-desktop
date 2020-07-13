import React from "react";

import {
  ExampleComponent,
  ExampleComponentWithType
} from "../components/ExampleComponent";
import AddCurrencyButton from "../components/AddCurrencyButton";
import CurrencyList from "../components/CurrencyList";
import { useSelector } from "react-redux";
import { getFirebaseAuth } from "../selectors/profile";
import LogoutButton from "../components/LogoutButton";
import { Menu, Layout, Breadcrumb } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons";

const Home = () => {
  const { uid }: any = useSelector(getFirebaseAuth);

  return (
    <Layout>
      <Layout.Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout.Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <h1>Home</h1>
            <div>
              Edit <code>src/App.tsx</code> and save to reload.
              <ExampleComponent who={"me"} />
              <ExampleComponentWithType who={"me2"} />
              <AddCurrencyButton />
              <CurrencyList uid={uid} />
            </div>
            <LogoutButton />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
